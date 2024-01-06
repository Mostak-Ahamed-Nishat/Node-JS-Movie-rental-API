const Rental = require('../model/rentalModel')
const {
    rentalSchemaValidator
} = require('../validators/validator')
const Customer = require('../model/customerModel')
const Movie = require('../model/moviesModel')

//Fawn
// var Fawn = require("fawn");
// Fawn.init(process.env.DB_CONNECTION)

// var task = Fawn.Task();


//get all the Rental list
async function getAllRental(req, res, next) {

    const rental = Rental.find().sort('-dateOut')
    if (!rental.length > 0) {
        return res.status(404).json({
            message: 'No rental has been found yet'
        })
    }

    return res.status(201).json({
        message: 'Rental found successfully',
        data: rental
    })

}

//Create a new rental

async function createRental(req, res, next) {
    // check the rental validation status
    const {
        error
    } = rentalSchemaValidator(req.body)

    // If any validation fails
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    // check the rental customer isAuthorized or not
    const customer = await Customer.findById(req.body.customer)
    if (!customer) {
        return res.status(400).json({
            error: "Customer not found"
        })

    }

    // check the rental movie isAvailable or not
    const movie = await Movie.findById(req.body.movie)
    if (!movie) {
        return res.status(400).json({
            error: "The Movie you want to rent is not found"
        })
    }

    //check the movie is in Stock or not
    if (movie.numberInStock == 0) {
        return res.status(400).json({
            message: "Movie out of stock"
        })
    }

    // Send the rental information to db
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })



    // task.save("rentals", rental).update("movies", {
    //     _id: movie._id
    // }, {
    //     $inc: {
    //         numberInStock: -1
    //     }
    // }).run().then(function (results) {
    //     // task is complete 

    //     // result from first operation
    //     var firstUpdateResult = results[0];

    //     // result from second operation
    //     var secondUpdateResult = results[1]
    // })
    // .catch(function (err) {
    //     // Everything has been rolled back.

    //     // log the error which caused the failure
    //     console.log(err);
    // });

    //Save the info to the database
    rental = await rental.save()
    //Decrement the number inStock of the movie
    movie.numberInStock--
    movie.save()

    //return response
    return res.status(200).json({
        data: rental
    })

}


module.exports = {
    getAllRental,
    createRental
}