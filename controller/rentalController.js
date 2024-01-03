const Rental = require('../model/rentalModel')
const {
    rentalSchemaValidator
} = require('../validators/validator')
const Customer = require('../model/customerModel')
const Movie = require('../model/moviesModel')


//get all the Rental list
async function getAllRental(req, res) {
    try {
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
    } catch (error) {
        return res.status(500).json({
            error: 'Server error',
        })
    }
}

//Create a new rental

async function createRental(req, res) {
    try {

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
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        })

        //Save the info to the database
        rental =await rental.save()

        console.log(rental);
        //Decrement the number inStock of the movie
        movie.numberInStock--
        await movie.save()

        //return response
        return res.status(200).json({
            data: rental
        })

    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
}


module.exports = {
    getAllRental,
    createRental

}