const Joi = require('joi');
const Product = User = require('../models/product')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

// const storage = multer.diskStorage({
//     destination: '../public/uploads',
//     filename: function(req,file,cb){
//         cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage:storage,
//     limits:{fileSize:1000000},
//     fileFilter: function(req,file,cb){
//         checkFileType(file,cb)
//     }
// }).single('image')

// function checkFileType(file,cb){
//     const fileTypes = /jpeg|jpg|png|gif/
//     const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
//     const mimetype = fileTypes.test(file.mimetype)

//     if(mimetype && extname){
//         return cb(null,true)
//     }
//     cb('Error: only images are supported')
// }

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            name: Joi.string().max(50).required(),
            quantity: Joi.number().required(),
            description: Joi.string().max(100).required(),
            title: Joi.string().required(),
            price: Joi.number().required()
            //imageName: Joi.string().required()
        });
        
        return schema.validate(data); 
    },

    async nameExists(name){
        let nameExists = await Product.findOne({name:name})
        if(nameExists){
            return true
        }
        return false
    },

    async updatedNameExists(data){
         let nameExists = await Product.findOne()
         .and([{name:data.name} , {_id:{$ne:data.id}}])
        if(nameExists){
            return true
        }
        return false
    },

    async uploadImage(file){
        console.log(file)
        if(!file){
            return {isValid:false,message:`image not found`}
        }
        const allowedExt = ['.jpg','.jpeg','.png','.gif']
        const fileExt = file.mimetype.split('/')[1]
        console.log('file '+fileExt)
        if(!allowedExt.includes('.'+fileExt)){
            return {isValid:false,message:`image extension ${fileExt} is not supported`}
        }

        //const filename = `prod-${Math.floor(Math.random() * 1000)}${fileExt}`
        //fs.writeFileSync(`${__dirname}/../public/products/${file.filename}`)
        //await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../public/products/${filename}`))

        return {isValid:true,filename:file.filename}
    },

    async deleteUploadedImage(imageName){
        fs.unlink(`${__dirname}/../public/products/${imageName}`,(err)=>{
            if(err) {console.error("image not found in directory")}
            else{console.info(imageName+' has been deleted')}
        })
    },



}

