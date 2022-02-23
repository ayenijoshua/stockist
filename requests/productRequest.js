const Joi = require('joi');
const Product = User = require('../models/product')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: '../public/uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
}).single('image')

function checkFileType(file,cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true)
    }
    cb('Error: only images are supported')
}

module.exports = {

    validate(data){
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            qauntity: Joi.number().required(),
            description: Joi.string().max(100).required(),
            title: Joi.string().required(),
            imageName: Joi.string().required()
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

    uploadImage: upload

}

