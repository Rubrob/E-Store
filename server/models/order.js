const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user_id: { type: String, default: null },
  status: {
    type: String,
    enum: ["pending", "arrived", "declined"],
    default: "pending"
  },
  delivery: {
    type: String,
    enum: ["standard", "expedited", "overnight"],
    default: "standard"
  },
  contacts: {
    firstname: { type: String },
    lastname: { type: String },
    address: { type: String },
    country: { type: String },
    city: { type: String },
    zip: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  items: [
    {
      color: { type: mongoose.Types.ObjectId, ref: "Color", required: true },
      product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
      size: { type: String, required: true },
      sku: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Order", orderSchema);
