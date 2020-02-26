const router = require("express").Router();
const controllers = require("../controllers/admin");
const {
  routeHelpers: { validateBody, schemas }
} = require("../helpers");

const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });

router
  .route("/category/create")
  .post(passportJWT, controllers.roleCheck, controllers.addCategory);
router.route("/signup").post(validateBody(schemas.authSchema), controllers.signUp);
router
  .route("/products/create")
  .post(passportJWT, controllers.roleCheck, controllers.createProduct);
router
  .route("/products/color/create/:product_id")
  .post(passportJWT, controllers.roleCheck, controllers.addProductColor);
// router
//   .route("/products/color/update/:id")
//   .put(passportJWT, controllers.roleCheck, controllers.addProductColor);

module.exports = router;
