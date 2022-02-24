const Joi = require('joi');
const User = require('../models/user')
const mongoose = require('mongoose');
const Product = require('../models/product');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            user: Joi.string().required(),
            product: Joi.string().required(),
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
            let prodExists = await Product.findOne({_id:products[i]})
            if(!prodExists){
                return {product:products[i],invalid:true}
            }
        }
       return {inValid:true}
    },

    checkStatus(data){
        const schema = Joi.object().keys({
            status: Joi.string().required(),
        });

        return schema.validate(data)
    },

    async uploadPop(file){
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

    



