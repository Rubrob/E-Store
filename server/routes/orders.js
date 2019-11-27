const router = require('express-promise-router')();
const OrdersController = require('../controllers/orders');


router.route('/order')
  .post(OrdersController.order)
router.route('/users_order')
  .post(OrdersController.getUserOrders)

module.exports = router;
