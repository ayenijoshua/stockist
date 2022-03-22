const Joi = require('joi')

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            subject: Joi.string().required(),
            message: Joi.string().required(),
            option: Joi.string().required()
        })

       return schema.validate(data)
    }
}