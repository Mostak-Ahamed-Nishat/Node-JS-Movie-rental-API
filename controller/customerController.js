const Customer = require('../model/customerModel')
const {
    customerSchemaValidator
} = require('../validators/validator')



//***Get all the customer list
async function getAllCustomer(req, res, next) {
    const customers = await Customer.find()
    res.status(200).json(customers)
}

//***Get the single customer by id
async function getCustomerById(req, res, next) {
    //get the customer by id
    const customer = await Customer.findById(req.params.id)
    //gif the customer available in the database
    if (!customer) {
        return res.status(404).json({
            error: 'Customer Not Found'
        })
    }
    return res.status(200).json(customer)
}


//***Create a new customer
async function createCustomer(req, res, next) {
    //check if any errors are encountered 
    const {
        error
    } = customerSchemaValidator.validate(req.body)

    // if any errors are encountered then send an error message
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })

    }
    //if the genre already not exists in the database create new one
    const customer = new Customer(req.body)
    await customer.save()

    // send a success message to the user after the genre has been created
    return res.status(201).json({
        message: 'Customer successfully has created',
        data: customer
    })
}


//*** Update Customer */
async function updateCustomer(req, res, next) {
    //check the update data if any validation fails
    const {
        error
    } = customerSchemaValidator.validate(req.body)

    //if any validation fails then throw an error
    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
            data: req.body
        })
    }

    //find the Customer by id and update 
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    // if the genre not found then throw an error
    if (!customer) {
        return res.status(404).json({
            error: 'Customer not found'
        })
    }

    //send the success message after the update
    res.status(201).json({
        message: 'Customer has been updated successfully .',
        data: customer
    })
}


//** Delete the Customer */
async function deleteCustomer(req, res, next) {
    //Delete the genre from the database
    const customer = await Customer.findByIdAndDelete(req.params.id)
    // if it doesn't exist
    if (!customer) {
        return res.status(404).json({
            error: 'Customer not found'
        })
    }
    //send a message to the user after the genre has been deleted
    return res.status(200).json({
        message: 'Customer has been deleted',
        data: genre
    })
}

module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}