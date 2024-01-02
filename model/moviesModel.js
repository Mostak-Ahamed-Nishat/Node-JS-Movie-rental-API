var mongoose = require('mongoose');
const {
    genreSchema
} = require('./genresModel');


const movieSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: 'number',
        required: true,
        min: 0,
    },
    dailyRentalRate: {
        type: 'number',
        required: true,
        min: 1,
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie