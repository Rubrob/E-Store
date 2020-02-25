const router = require("express").Router();
const controllers = require("../controllers/products");
const {
  validateToken,
  routeHelpers: { validateBody, schemas }
} = require("../helpers");

router.route("/m/:category_slug?").get(controllers.getProducts);
router.route("/t/:pslug/:pcslug").get(controllers.getProductDetails);
router.route("/suggestions/:search").get(controllers.getProductSuggestions);
router.route("/validate_cart").post(controllers.validateCart);
router
  .route("/add_to_cart")
  .post(validateBody(schemas.cartItem), controllers.addToCart, controllers.cartResponse);
router
  .route("/update_cart_item/:skuId")
  .post(
    validateBody(schemas.cartItem),
    controllers.updateCartItem,
    controllers.cartResponse
  );
router
  .route("/delete_cart_item/:skuId")
  .post(controllers.deleteCartItem, controllers.cartResponse);
router
  .route("/orders")
  .post(validateBody(schemas.orderSchema), validateToken, controllers.createOrder);

module.exports = router;
