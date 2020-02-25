const mongoose = require("mongoose");
mongoose.plugin(require("mongoose-slug-updater"));

const sizeTypes = {
  shoes: [
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "13.5",
    "14",
    "15",
    "16",
    "17",
    "18"
  ],
  clothes: ["XXS", "XS", "S", "M", "L", "XL", "2XL"],
  other: ["OSFA"]
};

function skugen() {
  const { _id, color } = this.parent();
  return _id.toString().slice(-12) + "_" + color + "_" + this.size;
}

const sizeSchema = mongoose.Schema({
  availability: { type: Number, required: true, default: 10 },
  sku: {
    type: String,
    default: skugen,
    unique: true,
    uppercase: true
  },
  size: {
    type: String,
    required: true,
    enum: [...sizeTypes.shoes, ...sizeTypes.clothes, ...sizeTypes.other]
  }
});

const colorSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["in_stock", "sold_out", "inactive"],
    default: "inactive"
  },
  preview_image: { type: String, required: true },
  slides: { type: [String], required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  slug: { type: String, slug: "color", unique: true },
  created_at: { type: Date, default: Date.now() },
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
  sizes: [sizeSchema]
  // [{ type: mongoose.Types.ObjectId, ref: "Size" }]
});

module.exports = mongoose.model("Color", colorSchema);
