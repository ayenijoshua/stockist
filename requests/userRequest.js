const Joi = require('joi');
const User = require('../models/user')
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(100).required(),
            state: Joi.string().required(),
            phone: Joi.string().required(),
            sponsorName: Joi.string().required(),
            idNumber: Joi.string().required(),
            deliveryType: Joi.string().required()
        });
        
        return schema.validate(data); 
    },

    validateRegistration(data){
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(100).required(),
            state: Joi.string().required(),
            phone: Joi.string().required(),
            sponsorName: Joi.string().required(),
            idNumber: Joi.string().required(),
        });
        
        return schema.validate(data); 
    },

    async emailExists(isUpdate=false,data){
        let userExists;
        if(isUpdate && data){
            userExists = await User.findOne({where:{email:data.email, _id:{$ne:data.id}}})
        }else{
            userExists = await User.findOne({email:data.email})
        }

        if(userExists){
            return userExists
        }
        return false
    },

    // async uploadTemporaryPop(file){
    //     if(!file || file== undefined){
    //         return {isValid:false,message:`proof of payment not found`}
    //     }
    //     const allowedExt = ['.jpg','.png','.jpeg']
    //     const fileExt = file.detectedFileExtension
    //     if(! allowedExt.includes(fileExt)){
    //         return {isValid:false,message:`file extention ${fileExt} is not supported`,filename:null}
    //     }

    //     const filename = `pop-${Math.floor(Math.random() * 1000)}${fileExt}`
    //     await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../public/pops/${filename}`))

    //     return {isValid:true,message:null,filename:filename}
    // },

    async deleteUploadedImage(imageName){
        fs.unlink(`${__dirname}/../public/pops/${imageName}`,(err)=>{
            if(err) {console.error("image not found in directory")}
            else{console.info(imageName+' has been deleted')}
        })
    },




}