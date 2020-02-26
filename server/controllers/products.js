const models = require("../models");
const { PER_PAGE } = require("../config");
const { filterEmpty } = require("../helpers");

const getProductDetails = async (req, res) => {
  try {
    const { pslug, pcslug } = req.params;
    const product = await models.Product.findOne({ slug: pslug })
      .select("-gender -create_at -status")
      .populate({
        path: "colors",
        select: "preview_image slug color"
      });

    await models.Color.findOne({ slug: pcslug, product: product._id })
      .select("-product")
      .exec((error, color) => {
        if (!color || error) {
          return res.status(404).json({ message: "Invalid pair" });
        }
        res.json({ product, color });
      });
  } catch (error) {
    res.status(404).json({ message: "Product doesn't exist" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { color, size, page, search, sort = "price_desc" } = req.query;
    const [sortType, sortValue] = sort.split("_");

    await models.Product.find(
      filterEmpty({
        category_slugs: req.params.category_slug,
        title: search ? new RegExp(`^${search}`, "i") : undefined
      })
    )
      .select("title subtitle slug")
      .populate({
        path: "colors",
        select: "preview_image color price slug",
        match: filterEmpty({
          color,
          "sizes.size": size
        }),
        options: { sort: { [sortType]: sortValue } }
      })
      .exec((error, docs) => {
        if (error)
          return res.json({
            products: [],
            message: error.message
          });

        let products = docs.filter(({ colors }) => colors.length);

        if (!products.length)
          return res.json({
            products: [],
            message: "No products has been found"
          });

        products_count = products.length;

        products = products
          .slice((page - 1) * PER_PAGE, page * PER_PAGE)
          .sort((a, b) =>
            sortValue === "desc"
              ? b.colors[0][sortType] - a.colors[0][sortType]
              : a.colors[0][sortType] - b.colors[0][sortType]
          );

        res.json({ products, products_count });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getProductSuggestions = async (req, res) => {
  const regex = new RegExp("^" + req.params.search, "i");
  const products = await models.Product.find({ title: regex }).populate({
    path: "colors",
    select: "preview_image color price slug",
    options: { limit: 1 }
  });

  res.json({
    products: products.slice(0, 6),
    products_total: products.length
  });
};

const cartResponse = (req, res) => {
  const { cart, totalQuantity, totalPrice } = req.session;
  res.json({
    cart,
    totalQuantity,
    totalPrice
  });
};

const addToCart = (req, res, next) => {
  const cartModel = models.Cart.setCart(req.session.cart);
  cartModel.add(req.body);
  const { cart, totalQuantity, totalPrice } = cartModel.data;

  req.session.cart = cart;
  req.session.totalQuantity = totalQuantity;
  req.session.totalPrice = totalPrice;
  next();
};

const updateCartItem = (req, res, next) => {
  const cartModel = models.Cart.setCart(req.session.cart);
  cartModel.update(req.body, req.params.skuId);
  const { cart, totalQuantity, totalPrice } = cartModel.data;

  req.session.cart = cart;
  req.session.totalQuantity = totalQuantity;
  req.session.totalPrice = totalPrice;
  next();
};

const deleteCartItem = (req, res, next) => {
  const cartModel = models.Cart.setCart(req.session.cart);
  cartModel.delete(req.params.skuId);
  const { cart, totalQuantity, totalPrice } = cartModel.data;

  req.session.cart = cart;
  req.session.totalQuantity = totalQuantity;
  req.session.totalPrice = totalPrice;
  next();
};

const validateCart = async (req, res) => {
  const { cart } = req.session;

  if (!cart || cart.length === 0) {
    return res.json({ cart: [], totalQuantity: 0, totalPrice: 0 });
  }

  const query = cart.map(({ quantity, sku }) => ({
    "tmp.availability": { $gte: quantity },
    "tmp.sku": sku
  }));

  models.Color.aggregate()
    .addFields({ tmp: "$sizes" })
    .unwind("tmp")
    .match({ $or: query })
    .lookup({
      from: "products",
      localField: "product",
      foreignField: "_id",
      as: "product_info"
    })
    .project({
      sku: "$tmp.sku",
      size: "$tmp.size",
      availability: "$tmp.availability",
      url: {
        $concat: [{ $arrayElemAt: ["$product_info.slug", 0] }, "/", "$slug"]
      },
      price: "$price",
      color: "$color",
      status: "$status",
      preview_image: "$preview_image",
      title: { $arrayElemAt: ["$product_info.title", 0] },
      subtitle: { $arrayElemAt: ["$product_info.subtitle", 0] },
      product_status: { $arrayElemAt: ["$product_info.status", 0] },
      sizes: {
        $map: {
          input: "$sizes",
          as: "size",
          in: {
            sku: "$$size.sku",
            size: "$$size.size",
            availability: "$$size.availability"
          }
        }
      }
    })
    .then(docs => {
      const skus = cart.map(({ sku }) => sku);
      const result = docs.map(item => {
        const idx = skus.findIndex(sku => sku === item.sku);
        if (idx <= -1) return {};

        return {
          ...item,
          quantity: cart[idx].quantity
        };
      });

      res.json({
        cart: result,
        totalPrice: req.session.totalPrice,
        totalQuantity: req.session.totalQuantity
      });
    });
};

const createOrder = async (req, res) => {
  const { delivery, addresses } = req.body;
  const { cart } = req.session;
  const query = cart.map(({ quantity, sku }) => ({
    "tmp.availability": { $gte: quantity },
    "tmp.sku": sku
  }));

  await models.Color.aggregate()
    .addFields({
      tmp: "$sizes"
    })
    .unwind("tmp")
    .match({ $or: query })
    .project({
      sku: "$tmp.sku",
      availability: "$tmp.availability",
      size: "$tmp.size",
      color: "$_id",
      product: "$product",
      price: "$price"
    })
    .then(async docs => {
      if (!docs.length)
        return res.status(401).json({
          message: "You have invalid products in your cart"
        });

      const orderItems = docs.map(item => {
        const idx = cart.findIndex(({ sku }) => sku === item.sku);
        return {
          sku: item.sku,
          size: item.size,
          color: item.color,
          product: item.product,
          price: item.price,
          quantity: cart[idx].quantity
        };
      });

      const updater = {};
      orderItems.forEach(item => {
        if (!updater[item.color]) updater[item.color] = {};
        updater[item.color][item.size] = item.quantity;
      });

      Object.keys(updater).forEach(_id => {
        models.Color.findOne({ _id }, (error, doc) => {
          const current = updater[doc._id];
          doc.sizes.forEach(size => {
            const value = current[size.size];
            if (value) size.availability = size.availability - value;
          });
          doc.save();
        });
      });

      const order = await models.Order.create({
        user_id: req.user_id,
        delivery,
        items: orderItems,
        contacts: addresses.shipping
      });

      await order.save();
      req.session.destroy();
      res.json({ order, message: "Thank you for order!" });
    })
    .catch(error => res.status(400).json({ message: error.message }));
};

module.exports = {
  getProductDetails,
  getProducts,
  getProductSuggestions,
  cartResponse,
  addToCart,
  updateCartItem,
  deleteCartItem,
  validateCart,
  createOrder
};
