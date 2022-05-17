const Joi = require('joi');
const Bank = require('../models/bank')

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            phone: Joi.number().min(11).required(),
        });
        
        return schema.validate(data); 
    },

    numerIsValid(numbers){
        for(let i=0; i<numbers.length; i++){
            let {error} = this.validate({phone:numbers[i]})
            if(error){
                return {isValid:false,number:numbers[i]}
            }
        }
       return {isValid:true}
    },
    




}