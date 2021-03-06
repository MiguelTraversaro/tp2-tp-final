const Joi = require('joi');

const productSchema = Joi.object({
    
    imagen: Joi.string().required(),
    producto: Joi.string().required(),
    stock: Joi.number().integer().required(),
    precio: Joi.number().required(),
    
})

module.exports = {
    productSchema
}