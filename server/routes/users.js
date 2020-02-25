require("../passport");
const router = require("express-promise-router")();
const passport = require("passport");
const controllers = require("../controllers/users");
const {
  routeHelpers: { validateBody, schemas }
} = require("../helpers");

const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false
});

router.route("/signup").post(validateBody(schemas.authSchema), controllers.signUp);
router
  .route("/login")
  .post(validateBody(schemas.logInSchema), passportSignIn, controllers.login);
router.route("/oauth/google").post(passportGoogle, controllers.login);
router.route("/oauth/facebook").post(passportFacebook, controllers.login);
router
  .route("/user")
  .get(passportJWT, controllers.getUser)
  .put(passportJWT, controllers.updateUserAddresses);
router.route("/orders").get(passportJWT, controllers.getUserOrders);

module.exports = router;
