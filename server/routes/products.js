const router       = require('express-promise-router')();
const ProductController = require('../controllers/products')

router.route('/products')
  .post(ProductController.postProduct)
  .get(ProductController.getProducts)

module.exports = router