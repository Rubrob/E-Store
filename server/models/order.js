const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


module.exports = mongoose.model(
    'order',
    new Schema({
        user_id: {type: String},
        order: [ {type: Object} ],
        delivery: {type: String},
        addresses: {},
        date: {
            type: Date,
            default: Date.now
        }
    })
);
