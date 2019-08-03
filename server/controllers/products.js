const Product = require('../models/product')

module.exports = {
    getProducts: async (req, res, next) => {
      const products = await Product.find({});

      res.status(200).json({
        products
      })
    },
    postProduct: async (req, res, next) => {
      req.body.forEach(async item => {
        new Product({
          ...item
        }).save()
      });

      res.json({
        status: 'post'
      })
    }
}