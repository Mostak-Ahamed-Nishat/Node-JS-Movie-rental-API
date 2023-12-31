const mongoose = require('mongoose');

const genres = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 200,
    }
}))

module.exports = genres