const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true, lowercase: true }
});

module.exports = mongoose.model("Category", categorySchema);
