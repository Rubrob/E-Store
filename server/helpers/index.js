const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../models");

const validateToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization; //.split(" ")[1]
      const { sub } = JWT.verify(token, JWT_SECRET);
      const user = await User.findById(sub);
      if (user) {
        req.user_id = user._id;
      } else {
        req.user_id = null;
      }
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

const singToken = user => {
  return JWT.sign(
    {
      iss: "nameOfTheSite",
      sub: user._id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
    },
    JWT_SECRET
  );
};

const filterEmpty = obj => {
  const res = {};
  for (const key in obj) {
    if (obj[key]) res[key] = obj[key];
  }
  return res;
};

// const createFile = (filename, data) => {
//   const fs = require("fs");
//   fs.appendFile(filename, JSON.stringify(data), error => {
//     if (err) throw err;
//     console.log("Saved!");
//   });
// };

module.exports = {
  validateToken,
  singToken,
  filterEmpty,
  routeHelpers: require("./routeHelpers")
};
