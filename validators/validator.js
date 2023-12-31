const Joi = require('joi');

const genreSchemaValidator = Joi.object({
    name: Joi.string().required().min(4).trim().max(200)
})

module.exports ={
    genreSchemaValidator
}