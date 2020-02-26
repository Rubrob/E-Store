const { User, Order } = require("../models");
const { singToken } = require("../helpers");

const signUp = async (req, res) => {
  const { email, password, firstname, lastname } = req.value.body;

  const existingUser = await User.findOne({ "local.email": email });

  if (existingUser) {
    return res.status(403).json({ message: "Email is already in use" });
  }

  const newUser = new User({
    method: "local",
    local: {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    }
  });
  await newUser.save();

  const token = singToken(newUser);
  res.status(200).json({ token });
};

const login = async (req, res) => {
  const token = singToken(req.user);
  res.status(200).json({ token });
};

const logout = async (req, res, next) => {
  req.logout();
  res.redirect("/");
};

const getUser = async (req, res, next) => {
  const { method, addresses } = req.user;
  const { firstname, lastname } = req.user[method]; // givenName, familyName

  res.status(200).json({
    fullname: `${firstname} ${lastname}`,
    addresses
  });
};

const updateUserAddresses = async (req, res) => {
  let type;

  if (req.body.billing) {
    type = "billing";
  } else if (req.body.shipping) {
    type = "shipping";
  } else {
    return res.status(403).json({ message: "Wrong data" });
  }

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { [`addresses.${type}`]: req.body[type] },
    { useFindAndModify: false, new: true },
    (error, doc) => {
      if (error) return res.status(403).json({ message: error.message });

      res.status(200).json({ addresses: doc.addresses });
    }
  );
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.user._id })
    .select("items created_at")
    .populate({ path: "items.color", select: "color preview_image price slug" })
    .populate({ path: "items.product", select: "title subtitle slug" });

  res.status(200).json({ orders });
};

module.exports = {
  signUp,
  login,
  logout,
  getUser,
  updateUserAddresses,
  getUserOrders
};
