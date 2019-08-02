const mongoose = require('mongoose')
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    id: {
      type: String,
      unique: true
    },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    subcategory: { type: String },
    gender: { type: String },
    colors: [{
      id: {
        type: String,
        unique: true
      },
      color: { type: String },
      preview: { type: String },
      images: [{ type: String }],
      sizes: [],
      availability: { type: Number }
    }]
})

module.exports = mongoose.model('product', userSchema)