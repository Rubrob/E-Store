const mongoose = require('mongoose')
const Schema   = mongoose.Schema;

const categorySchema = new Schema({
    title: { type: String },
    categories: [{
      title: { type: String },
      subcategories: [{
        title: { type: String }
      }]
    }],
})

module.exports = mongoose.model('category', categorySchema)