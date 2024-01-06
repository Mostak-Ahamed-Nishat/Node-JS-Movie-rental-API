const express = require('express')
const router = express.Router()

const {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
} = require('../controller/genreController')
const isAuthenticatedUser = require('../middleware/authMiddleware')

//get all the genres
router.get('/', getAllGenres)

//get genre by id
router.get('/:id', getGenreById)

//Create a new genre
router.post('/',isAuthenticatedUser, createGenre)

//Update the genre
router.put('/:id', updateGenre)

//Delete the genre
router.delete('/:id', deleteGenre)


module.exports = router