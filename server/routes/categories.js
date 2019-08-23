const router       = require('express-promise-router')();
const CategoriesController = require('../controllers/categories')

router.route('/categories')
  .get(CategoriesController.getCategories)

module.exports = router