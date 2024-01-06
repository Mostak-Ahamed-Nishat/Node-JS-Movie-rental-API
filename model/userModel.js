const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

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

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, process.env.JWT_PRIVATE_KEY)
    return token
}



const User = mongoose.model('User', userSchema);

console.log();

module.exports = User;