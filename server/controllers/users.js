const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const User = require('../models/user');


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
            id: newUser._id
        })
    },

    signIn: async (req, res, next) => {
        const token = singToken(req.user);
        res.status(200).json({
            token,
            id: req.user._id
        })
    },

    googleOAuth: async (req, res, next) => {
        const token = singToken(req.user)
        res.status(200).json({
            token,
            id: req.user._id
        })
    },

    facebookOAuth: async (req, res, next) => {
        const token = singToken(req.user)
        res.status(200).json({
            token,
            id: req.user._id
        })
    },

    secret: async (req, res, next) => {
        res.json({
            secret: 'resource'
        })
    },

    getUser: async (req, res, next) => {
        const {user_id} = req.body
        const customer = await User.findOne({
            "_id": user_id
        });

        const method = customer.method
        const givenName = customer[method].firstname
        const familyName = customer[method].lastname
        res.status(200).json({
            fullname: `${givenName} ${familyName}`,
            addresses: customer.addresses
        })
    },

    updateUser: async (req, res, next) => {
        const {data, type} = req.body
        let customer = {}

        customer = await User.findOne({
            "_id": req.body.user_id
        });

        if(type === 'shipping'){
            await customer.update({ 'addresses.shipping': data }, (err, doc) => {
                console.log('DOC', doc);
            });
        }

        if(type === 'billing'){
             await customer.update({ 'addresses.billing': data }, (err, doc) => {
                console.log('DOC', doc);
            });
        }
        await customer.save()

        console.log(customer);
        res.status(200).json({
            customer,
            status: 'updated'
        })
    }

}
