const { User, Order } = require("../models");
const { singToken } = require("../helpers");

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, firstname, lastname } = req.value.body;

    const existingUser = await User.findOne({
      "local.email": email
    });

    if (existingUser) {
      console.log("Email is already in use");
      return res.status(404).json({ message: "Email is already in use" });
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
  },
  login: async (req, res) => {
    const token = singToken(req.user);
    res.status(200).json({ token });
  },
  logout: async (req, res, next) => {
    req.logout();
    res.redirect("/");
  },
  getUser: async (req, res, next) => {
    const method = req.user.method;
    const givenName = req.user[method].firstname;
    const familyName = req.user[method].lastname;
    res.status(200).json({
      fullname: `${givenName} ${familyName}`,
      addresses: req.user.addresses
    });
  },
  updateUserAddresses: async (req, res, next) => {
    const user = await User.findById(req.user._id);

    await user.updateOne({
      addresses: {
        ...user.addresses,
        ...req.body
      }
    });

    res.status(200).json({ addresses: req.body });
  },
  getUserOrders: async (req, res, next) => {
    const orders = await Order.find({ user_id: req.user._id })
      .select("items created_at")
      .populate({ path: "items.color", select: "color preview_image price slug" })
      .populate({ path: "items.product", select: "title subtitle slug" });

    res.status(200).json({ orders });
  }
};
