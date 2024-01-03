var mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
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
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: 'string',
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: 'number',
                required: true,
                min: 1,
            }
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}))

module.exports = Rental