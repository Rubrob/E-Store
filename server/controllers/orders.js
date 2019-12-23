const Order = require('../models/order');


module.exports = {
    order: async (req, res, next) => {
      const { user_id, order, delivery, addresses } = req.body.data

      const newOrder = new Order({
        user_id,
        order,
        delivery,
        addresses
      })
      await newOrder.save()

      res.status(200).json({
        message: 'Thank you for your order!'
      })
    },

    getUserOrders: async (req, res, next) => {
      const {user_id} = req.body
      const orders = await Order
        .find({"user_id": user_id})
        .select("order date")
        
      res.status(200).json({
        orders
      })
    }
}
