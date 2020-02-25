const mongoose = require("mongoose");
mongoose.plugin(require("mongoose-slug-updater"));

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  status: {
    type: String,
    enum: ["in_stock", "sold_out", "inactive"],
    default: "inactive"
  },
  slug: { type: String, slug: "title", unique: true },
  gender: { type: String, enum: ["Men", "Women"], required: true },
  category: { type: String, required: true },
  category_slugs: { type: [String], require: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  colors: [{ type: mongoose.Types.ObjectId, ref: "Color" }]
});

module.exports = mongoose.model("Product", productSchema);
