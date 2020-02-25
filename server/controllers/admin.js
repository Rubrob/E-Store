const models = require("../models");
const config = require("../config");

module.exports = {
  createProduct: async (req, res) => {
    const {
      title,
      category,
      subtitle,
      category_slugs,
      gender,
      description,
      colors
    } = req.body;
    const { sizes, price, color, slides, preview_image } = req.body.colors[0];

    try {
      const newProduct = new models.Product({
        title,
        gender,
        category,
        subtitle,
        category_slugs,
        description
      });

      const newColor = new models.Color({
        color,
        price,
        sizes,
        slides,
        preview_image,
        product: newProduct._id
      });

      await newColor.save().then(async color => {
        await newProduct.colors.push(color._id);
        await newProduct.save();
      });

      const product = await newProduct.populate("colors").execPopulate();

      res.json({ product });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addProductColor: async (req, res, next) => {
    const { product_id } = req.params;
    const { sizes, slides, preview_image, price, color } = req.body;

    const newColor = new models.Color({
      color,
      price,
      sizes,
      slides,
      preview_image,
      product: product_id
    });

    await newColor.save();

    const product = await models.Product.findById(product_id);
    product.colors.push(newColor._id);
    await product.save().then(async docs => {
      const products = await docs.populate("colors", ["color", "slug"]).execPopulate();

      res.json({ products });
    });
  },
  adminMiddleware: (req, res, next) => {
    try {
      const secret = req.headers.authorization
        ? req.headers.authorization.split(" ")
        : null;

      if (secret[1] === config.ADMIN_SECRET) {
        next();
      } else {
        res.status(403).send("Invalid code");
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
    }
  },
  addCategory: async (req, res) => {
    const { slug } = req.body;
    const category = new models.Category({ slug });
    await category.save();
    res.json({ category });
  }
};
