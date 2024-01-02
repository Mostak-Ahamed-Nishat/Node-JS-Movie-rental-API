const {
    Genre
} = require('../model/genresModel')
const {
    genreSchemaValidator
} = require('../validators/validator')

//***Get all the genres list
async function getAllGenres(req, res) {

    try {
        const genres = await Genre.find()
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

//***Get the single genre by id
async function getGenreById(req, res) {

    try {
        //get the genre by id
        const genre = await Genre.findById(req.params.id)

        //gif the genre available in the database
        if (genre) {
            res.status(200).json(genre)
        } else {
            res.status(404).json({
                error: 'Genre Not Found'
            })
        }


    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

//***Create a new genre
async function createGenre(req, res) {
    
    try {
        //check if any errors are encountered 
        const {
            error
        } = genreSchemaValidator.validate(req.body)

        // if any errors are encountered then send an error message
        if (error) {
            res.status(400).json({
                error: error.details[0].message
            })
        }

        //if the genre already not exists in the database create new one
        const genre = new Genre(req.body)
        await genre.save()

        // send a success message to the user after the genre has been created
        res.status(201).json({
            message: 'genre successfully has created',
            data: genre
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

//*** Update genre */

async function updateGenre(req, res) {
    try {

        //check the update data if any validation fails
        const {
            error
        } = genreSchemaValidator.validate(req.body)

        //if any validation fails then throw an error
        if (error) {
            console.log(error);
            res.status(400).json({
                error: error.details[0].message,
                data: req.body.name
            })
            return 0
        }

        //find the genre by id and update 
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })


        // if the genre not found then throw an error
        if (!genre) {
            res.status(404).json({
                error: 'Genre not found'
            })
        }

        //send the success message after the update
        res.status(201).json({
            message: 'Genre was successfully updated.',
            data: genre
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

//** Delete the genre */

async function deleteGenre(req, res) {
    try {
        //Delete the genre from the database
        const genre = await Genre.findByIdAndDelete(req.params.id)

        // if it doesn't exist
        if (!genre) {
            res.status(404).json({
                error: 'genre not found'
            })
        }
        //send a message to the user after the genre has been deleted
        res.status(200).json({
            message: 'genre has been deleted',
            data: genre
        })

    } catch (error) {
        res.status(500).json({
            error: error.details[0].message
        })
    }
}

module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
}