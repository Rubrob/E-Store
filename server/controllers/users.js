const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');


singToken = (user) => {
    return JWT.sign({
        iss: 'nameOfTheSite',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        const {email, password, firstname, lastname} = req.value.body;

        const existingUser = await User.findOne({
            "local.email": email
        });
        
        if (existingUser) {
            console.log('Email is already in use')
            return res.status(403).json({
                error: 'Email is already in use'
            })
        }

        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname
            },
        })
        await newUser.save()

        // https://jwt.io/
        const token = singToken(newUser)

        res.status(200).json({
            token,
        })
    },

    login: async (req, res, next) => {
        const token = singToken(req.user);
        res.status(200).json({
            token,
        })
    },
    logout: async (req, res, next) => {
        req.logout()
        res.redirect('/')
    },

    getUser: async (req, res, next) => {
        const method = req.user.method
        const givenName = req.user[method].firstname
        const familyName = req.user[method].lastname
        res.status(200).json({
            fullname: `${givenName} ${familyName}`,
            addresses: req.user.addresses
        })
    },

    updateUser: async (req, res, next) => {
        const user = await User.findOne({
            "_id": req.user._id
        })

        await user.update({
            addresses: {
                ...user.addresses,
                ...req.body
            }
        })
        await user.save()

        res.status(200).json({
            addresses: user.addresses
        })
    },

    getUserOrders: async (req, res, next) => {
        const orders = await Order
          .find({"user_id": req.user._id})
          .select("order date")
          
        res.status(200).json({
          orders
        })
    },

    createOrder: async (req, res, next) => {
        let user_id = null
        try {
            if(req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1]
                const payload = JWT.verify(token, JWT_SECRET)
                const user = await User.findById(payload.sub)
                if(user) {
                    user_id = user._id
                }
            } 
        } catch (error) {
            res.json({
                message: "Token is invalid"
            })
        }
        const {order, delivery, addresses} = req.body

        const newOrder = new Order({
          user_id,
          order,
          delivery,
          addresses
        })
        await newOrder.save()
  
        res.status(200).json({
          message: 'Thank you for order!',
          order: newOrder
        })
    },

}
