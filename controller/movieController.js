const {
    Genre
} = require("../model/genresModel");
const Movie = require("../model/moviesModel");
const {
    movieSchemaValidator
} = require("../validators/validator");


// Get all the movie list
async function getAllMovies(req, res) {
    try {
        //Get all movies from the database with the genre name
        const movies = await Movie.find().populate('genre')

        if (movies.length == 0) {
            res.status(200).json({
                message: 'No movie has been created yet'
            })
            return 0
        }
        if (movies) {
            res.status(201).json(movies)
            return 0
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        return 0
    }
}


//Post the movie
async function createMovie(req, res) {
    //check if the genre is exists or not
    const genre = await Genre.findById(req.params.id)

    if (!genre) {
        res.status(404).json({
            error: 'genre not found'
        })
    }

    const {
        name,
        numberInStock,
        dailyRentalRate
    } = req.body

    // Check the validation
    const {error} = movieSchemaValidator.validate({
        name,
        genre:`${genre}`,
        numberInStock,
        dailyRentalRate
    })

    if (error) {
        res.status(400).json({
            error: error.details[0].message
        })
        return 0
    }


    let data = {
        name,
        genre,
        numberInStock,
        dailyRentalRate,
    }


    //post the movie
    const movie = await new Movie(data)
    movie.save()

    res.status(200).json({
        message: 'Movie saved successfully',
        data: movie
    })

}


module.exports = {
    getAllMovies,
    createMovie
}