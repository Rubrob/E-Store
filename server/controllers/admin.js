const models = require("../models");
const config = require("../config");
const { singToken } = require("../helpers");

module.exports = {
  roleCheck: async (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(404).json({ message: "Unauthorized" });
    }
  },
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

    const { sizes, price, color, slides, preview_image } = colors[0];

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
  addCategory: async (req, res) => {
    const { slug } = req.body;
    const category = new models.Category({ slug });
    await category.save();
    res.json({ category });
  },
  signUp: async (req, res) => {
    const { email, password, firstname, lastname } = req.value.body;

    const existingUser = await models.User.findOne({ "local.email": email });

    if (existingUser) {
      return res.status(403).json({ message: "Email is already in use" });
    }

    const newUser = new models.User({
      method: "local",
      role: "admin",
      local: {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
      }
    });
    await newUser.save();

    const token = singToken(newUser);
    res.status(200).json({ token });
  }
};
