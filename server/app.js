require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const app = express();
const config = require("./config");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: config.DB_URI,
  collection: "sessions"
});

app.use(
  session({
    store,
    name: "CART",
    resave: false,
    secret: config.SESSION_SECRET,
    saveUninitialized: true,
    unset: "destroy",
    cookie: {
      maxAge: config.COOKIES_MAX_AGE,
      sameSite: true,
      secure: false
    }
  })
);
mongoose.connect(config.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
// app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/", require("./routes/admin"));

app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")));

app.listen(config.PORT, () =>
  console.log(`

  Application runnin on http://localhost:${config.PORT}/

  `)
);

module.exports = app;
