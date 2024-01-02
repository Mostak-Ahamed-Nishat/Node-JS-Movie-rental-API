const Joi = require('joi');



//Genre validators
const genreSchemaValidator = Joi.object({
    name: Joi.string().required().min(4).trim().max(200)
})


//Movies validators
const movieSchemaValidator = Joi.object({
    name: Joi.string().min(5).max(255).trim().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(1)
});



module.exports = {
    genreSchemaValidator,
    movieSchemaValidator
}