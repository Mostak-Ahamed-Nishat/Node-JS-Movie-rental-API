const Customer = require('../model/customerModel')
const {
    customerSchemaValidator
} = require('../validators/validator')



//***Get all the customer list
async function getAllCustomer(req, res) {

    try {
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

//***Get the single customer by id
async function getCustomerById(req, res) {

    try {
        //get the customer by id
        const customer = await Customer.findById(req.params.id)

        //gif the customer available in the database
        if (customer) {
            res.status(200).json(customer)
        } else {
            res.status(404).json({
                error: 'Customer Not Found'
            })
        }

    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}



//***Create a new customer
async function createCustomer(req, res) {

    try {
        //check if any errors are encountered 
        const {
            error
        } = customerSchemaValidator.validate(req.body)

        // if any errors are encountered then send an error message
        if (error) {
            res.status(400).json({
                error: error.details[0].message
            })
            return 0
        }

        //if the genre already not exists in the database create new one
        const customer = new Customer(req.body)
        await customer.save()

        // send a success message to the user after the genre has been created
        res.status(201).json({
            message: 'Customer successfully has created',
            data: customer
        })

    } catch (error) {
        res.status(500).json({
            error: "Server error"
        })
        return 0
    }
}

//*** Update Customer */

async function updateCustomer(req, res) {
    try {

        //check the update data if any validation fails
        const {
            error
        } = customerSchemaValidator.validate(req.body)

        //if any validation fails then throw an error
        if (error) {
            console.log(error);
            res.status(400).json({
                error: error.details[0].message,
                data: req.body
            })
            return 0
        }

        //find the Customer by id and update 
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })


        // if the genre not found then throw an error
        if (!customer) {
            res.status(404).json({
                error: 'Customer not found'
            })
        }

        //send the success message after the update
        res.status(201).json({
            message: 'Customer has been updated successfully .',
            data: customer
        })

    } catch (error) {
        res.status(500).json({
            error: "Server error: "
        })
    }
}

//** Delete the Customer */

async function deleteCustomer(req, res) {
    try {
        //Delete the genre from the database
        const customer = await Customer.findByIdAndDelete(req.params.id)

        // if it doesn't exist
        if (!customer) {
            res.status(404).json({
                error: 'Customer not found'
            })
        }
        //send a message to the user after the genre has been deleted
        res.status(200).json({
            message: 'Customer has been deleted',
            data: genre
        })
        return 0

    } catch (error) {
        res.status(500).json({
            error: "Server error"
        })
    }
}

module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}