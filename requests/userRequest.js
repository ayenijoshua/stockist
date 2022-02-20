const Joi = require('joi');
const User = User = require('../models/user')
module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(100).required(),
            state: Joi.string().required(),
            phone: Joi.string().required()
        });
        
        return schema.validate(data); 
    },

    async emailExists(isUpdate=false,data){
        let userExists;
        if(isUpdate && data){
            userExists = await User.findOne({where:{email:data.email, _id:{$ne:data.id}}})
        }else{
            userExists = await User.findOne({where:{email:data.email}})
        }

        if(userExists){
            return true
        }
        return false
    }

    




}