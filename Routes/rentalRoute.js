const express = require('express')
const {
    getAllRental,
    createRental
} = require('../controller/rentalController')
const router = express.Router()

//get all the Rental list
router.get('/', getAllRental)


//Create a new Rental
router.post('/', createRental)

module.exports = router