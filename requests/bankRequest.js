const Joi = require('joi');
const Bank = require('../models/bank')

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            bankName: Joi.string().required(),
            accountName: Joi.string().required(),
            accountNumber: Joi.string().required(),
        });
        
        return schema.validate(data); 
    },


    




}