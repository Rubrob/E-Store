const Joi = require("@hapi/joi");

module.exports = {
  validateBody: schema => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    if (!req.value) req.value = {};
    req.value["body"] = value;
    next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required()
    }),
    logInSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }),
    cartItem: Joi.object()
      .keys({
        quantity: Joi.number().max(10),
        sku: Joi.string(),
        size: Joi.string(),
        price: Joi.number()
      })
      .required(),
    orderSchema: Joi.object().keys({
      delivery: Joi.string().required(),
      addresses: Joi.object().required()
    })
  }
};
