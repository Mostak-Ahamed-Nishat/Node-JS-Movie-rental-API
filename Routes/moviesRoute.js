const express = require('express');
const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
} = require('../controller/movieController');
const router = express.Router();


//get all movies
router.get('/', getAllMovies)

//post a new movies || /api/movie/659450300938ec61cb2ec41d
router.post('/:id', createMovie)

// get movie by id
router.get('/:id', getMovieById)

// update movie by id
router.put('/:id', updateMovie)

// delete a movie
router.delete('/:id', deleteMovie)


module.exports = router