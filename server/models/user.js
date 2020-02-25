const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const shippingAddress = {
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  address: { type: String, default: "" },
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  zip: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" }
};

const billingAddress = {
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  address: { type: String, default: "" },
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  zip: { type: String, default: "" }
};

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true
  },
  local: {
    email: { type: String, lowercase: true },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String }
  },
  google: {
    id: { type: String },
    email: { type: String, lowercase: true },
    firstname: { type: String },
    lastname: { type: String }
  },
  facebook: {
    id: { type: String },
    email: { type: String, lowercase: true },
    firstname: { type: String },
    lastname: { type: String }
  },
  addresses: {
    shipping: shippingAddress,
    billing: billingAddress
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") next();

    const salt = await bcrypt.genSalt(10);
    const PWHash = await bcrypt.hash(this.local.password, salt);

    this.local.password = PWHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("user", userSchema);
