const Joi = require('joi');
const RegisteredUser = require('../models/registeredUser')
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().email().required(),
            username: Joi.string().max(100).required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            referrer: Joi.string().required(),
        });
        
        return schema.validate(data); 
    },

    async emailExists(email){
        userExists = await RegisteredUser.findOne({email:email})
        if(userExists == null){
            return false
        }
        return true
    },

    async usernameExists(username){
        userExists = await RegisteredUser.findOne({username:username})
        if(userExists == null){
            return false
        }
        return true
    },

    async referralExists(referral){
        userExists = await RegisteredUser.findOne({username:referral})
        if(userExists == null){
            return false
        }
        return true
    },

}