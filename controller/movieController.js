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
        const movies = await Movie.find().populate('genre', 'name -_id');

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
    try {
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

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })

        }


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
        const movie = await new Movie(data)
        movie.save()

        return res.status(200).json({
            message: 'Movie saved successfully',
            data: movie
        })

    } catch (error) {
        return res.status(500).json({
            error: 'Server error',
        })
    }
}

// get the movie by its id
async function getMovieById(req, res) {
    try {
        // find the movie by its id
        const movie = await Movie.findById(req.params.id)
        // if movie is not found
        if (!movie) {
            res.status(404).json({
                error: 'Movie not found',
            })
        }

        // if movie found
        if (movie) {
            res.status(201).json({
                data: movie
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        })
    }
}


// get the movie by its id and update the movie
async function updateMovie(req, res) {
    try {
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
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        })
    }
}


//delete a movie
async function deleteMovie(req, res) {
    // find the movie and delete
    try {
        await Movie.findOneAndDelete(req.params.id)
        res.status(200).json({
            message: 'Movie deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        })
    }


}


module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
}