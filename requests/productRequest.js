const Joi = require('joi');
const Product = User = require('../models/product')

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            qauntity: Joi.number().required(),
            description: Joi.string().max(100).required(),
            title: Joi.string().required(),
            imageName: Joi.string().required()
        });
        
        return schema.validate(data); 
    },

    nameExists(name){
        let nameExists = await Product.findOne({name:name})
        if(nameExists){
            return true
        }
        return false
    }

}