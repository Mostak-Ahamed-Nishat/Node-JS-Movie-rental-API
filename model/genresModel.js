const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 200,
    }
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = {
    Genre,
    genreSchema
}