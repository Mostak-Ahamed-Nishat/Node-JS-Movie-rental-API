const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 11,
    },
    isGold: {
        type: 'boolean',
        required: true,
    }
})

const Customer = mongoose.model('customer', customerSchema)

module.exports = Customer