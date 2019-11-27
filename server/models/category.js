const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


module.exports = mongoose.model(
  'category',
  new Schema({
    title: {type: String},
    categories: [{
      title: {type: String},
      subcategories: [{
        title: {type: String}
      }]
    }],
  })
);
