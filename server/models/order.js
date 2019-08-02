const mongoose = require('mongoose')
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
    user_id: { type: String },
    order: [ { type: Object } ],
    delivery: { type: String },
    addresses: {},
})

module.exports = mongoose.model('order', orderSchema)