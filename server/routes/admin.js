const router = require("express").Router();
const controllers = require("../controllers/admin");

router
  .route("/category/create")
  .post(controllers.adminMiddleware, controllers.addCategory);
router
  .route("/products/create")
  .post(controllers.adminMiddleware, controllers.createProduct);
router
  .route("/products/color/create/:product_id")
  .post(controllers.adminMiddleware, controllers.addProductColor);
// router
//   .route("/products/color/update/:id")
//   .put(controllers.adminMiddleware, controllers.addProductColor);

module.exports = router;
