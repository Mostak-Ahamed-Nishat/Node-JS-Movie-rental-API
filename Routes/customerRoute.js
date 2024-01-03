const express = require('express')
const router = express.Router()


const {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controller/customerController')

//get all the Customer
router.get('/', getAllCustomer)

//get Customer by id
router.get('/:id', getCustomerById)

//Create a new Customer
router.post('/', createCustomer)

//Update the Customer
router.put('/:id', updateCustomer)

//Delete the genre
router.delete('/:id', deleteCustomer)


module.exports = router