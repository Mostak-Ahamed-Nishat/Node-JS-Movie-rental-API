const {
    Genre
} = require("../model/genresModel");
const Movie = require("../model/moviesModel");
const {
    movieSchemaValidator
} = require("../validators/validator");


// Get all the movie list
async function getAllMovies(req, res, next) {
    //Get all movies from the database with the genre name
    const movies = await Movie.find().populate('genre', 'name -_id');

    //if no movies were found
    if (movies.length == 0) {
        return res.status(200).json({
            message: 'No movie has been created yet'
        })
    }
    //send the movie to client
    return res.status(201).json(movies)

}


//Post the movie
async function createMovie(req, res, next) {
    //check if the genre is exists or not
    const genre = await Genre.findById(req.params.id)

    if (!genre) {
        res.status(404).json({
            error: 'Genre not found'
        })
    }

    const {
        title,
        numberInStock,
        dailyRentalRate
    } = req.body


    // Check the validation
    const {
        error
    } = movieSchemaValidator.validate({
        title,
        genre: `${genre}`,
        numberInStock,
        dailyRentalRate
    })

    // if any validation errors are encountered
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })

    }

    //prepare the movie data
    let data = {
        title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock,
        dailyRentalRate,
    }


    //post the movie into the database
    const movie = await new Movie(data)
    movie.save()

    return res.status(200).json({
        message: 'Movie saved successfully',
        data: movie
    })

}

// get the movie by its id
async function getMovieById(req, res, next) {
    // find the movie by its id
    const movie = await Movie.findById(req.params.id)
    // if movie is not found
    if (!movie) {
        res.status(404).json({
            error: 'Movie not found',
        })
    }

    // if movie found
    return res.status(201).json({
        data: movie
    })


}


// get the movie by its id and update the movie
async function updateMovie(req, res, next) {

    // find the movie by its id
    const genre = await Genre.findById(req.body.genre)
    if (!genre) {
        res.status(404).json({
            error: 'genre not found'
        })
    }
    //get the data from body
    const {
        title,
        numberInStock,
        dailyRentalRate
    } = req.body

    // Check the validation
    const {
        error
    } = movieSchemaValidator.validate({
        title,
        genre: `${genre}`,
        numberInStock,
        dailyRentalRate
    })

    // if any validation fails then throw an error
    if (error) {
        res.status(400).json({
            error: error.details[0].message
        })
        return 0
    }

    // prepare the move object for the database
    let data = {
        title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock,
        dailyRentalRate,
    }


    //post the movie
    const movie = await Movie.findByIdAndUpdate(req.params.id, data, {
        new: true
    })

    res.status(200).json({
        message: 'Movie has been created successfully',
        data: movie
    })

}


//delete a movie
async function deleteMovie(req, res, next) {
    // find the movie and delete
    await Movie.findOneAndDelete(req.params.id)
    res.status(200).json({
        message: 'Movie deleted successfully'
    })
}


module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
}