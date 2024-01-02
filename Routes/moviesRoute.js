const express = require('express');
const {
    getAllMovies,
    createMovie
} = require('../controller/movieController');
const router = express.Router();


//get all movies
router.get('/', getAllMovies)
//post a new movies
router.post('/:id', createMovie)


module.exports = router