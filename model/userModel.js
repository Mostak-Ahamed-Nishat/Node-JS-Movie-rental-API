const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                // Regular expression for basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: 'string',
        minlength: 8,
        required: true,
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;