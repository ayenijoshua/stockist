const Joi = require('joi');
const CompanyContact = require('../models/companyContact')

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
        });
        
        return schema.validate(data); 
    },


    




}