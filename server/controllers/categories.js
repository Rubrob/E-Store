const Category = require('../models/category');


module.exports = {
    getCategories: async (req, res, next) => {
      const categories = await Category.find({});

      res.status(200).json({
        categories
      })
    }
}
