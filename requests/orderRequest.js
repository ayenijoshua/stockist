const Joi = require('joi');
const User = require('../models/user')
const mongoose = require('mongoose');
const Product = require('../models/product');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)

module.exports = {

    validateUserData(data){
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            sponsorName:Joi.string().required(),
            address: Joi.string().required(),
            address: Joi.string().required(),
            //IdNumber: Joi.string().required(),
            username: Joi.string().required(),
            bankName: Joi.string().required(),
            accountNumber: Joi.string().required(),
            uplineUsername: Joi.string().required(),
            sponsorBankName: Joi.string().required(),
            sponsorAccountNumber: Joi.string().required(),
            sponsorUsername: Joi.string().required(),
            sponsorState: Joi.string().required(),
        });
        
        return schema.validate(data); 
    },

    validateOrderData(data){
        const schema = Joi.object().keys({
            products:Joi.array().required(),
            totalPrice: Joi.required(),
            totalQty: Joi.required(),
        });
        
        return schema.validate(data); 
    },

    async userExists(id){
        let user = await User.findOne({_id:id})
        
        if(user){
            return user
        }
        return false
    },

    async productExists(products){
        for(let i=0; i<products.length; i++){
            let prodExists = await Product.findOne({_id:products[i].id})
            if(!prodExists){
                return {isValid:false,product:products[i].name}
            }
        }
       return {isValid:true}
    },

    checkStatus(data){
        const schema = Joi.object().keys({
            status: Joi.string().required(),
        });

        return schema.validate(data)
    },

    async uploadPop(file){
        if(!file || file== undefined){
            return {isValid:false,message:`proof of payment not found`}
        }
        const allowedExt = ['jpg','png','jpeg']
        const fileExt = file.detectedFileExtension
        if(! allowedExt.includes(fileExt)){
            return {isValid:false,message:`file extention ${fileExt} is not supported`,filename:null}
        }

        const filename = `pop-${Math.floor(Math.random * 1000)}${fileExt}`
        await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../public/pops/${filename}`))

        return {isValid:true,message:null,filename:filename}
    }
}

    



