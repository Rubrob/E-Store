const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: { type: String },
        firstname: { type: String },
        lastname: { type: String }
    },
    google: {
        id: { type: String  },
        email: {
            type: String,
            lowercase: true
        },
        firstname: { type: String },
        lastname: { type: String }
    },
    facebook: {
        id: { type: String },
        email: {
            type: String,
            lowercase: true
        },
        firstname: { type: String },
        lastname: { type: String }
    },
    addresses: {
        shipping: {
                firstname: '',
                lastname: '',
                address: '',
                country: '',
                city: '',
                zip: '',
                email: '',
                phone: ''
            },
            billing: {
                firstname: '',
                lastname: '',
                address: '',
                country: '',
                city: '',
                zip: ''
            }
    }
})

userSchema.pre('save', async function (next) {
    try {

        if(this.method !== 'local'){
            next()
        }
        // Generate a Salt
        const salt = await bcrypt.genSalt(10)

        // Generate a password Hash (salt + hash)
        const PWHash = await bcrypt.hash(this.local.password, salt)

        // Re-assign hashed version over original, plain text password
        this.local.password = PWHash;
        next()
    } catch (err) {
        next(err)
    }
})


userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (err) {
        throw new Error(err);
    }
}


module.exports = mongoose.model('user', userSchema)