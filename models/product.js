const { string } = require('joi')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        description:{
            type:String
        },
        imageName:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true,
        },
        created_at:{
            type:Date,
            default: Date.now
        },
    }
)

const Product = mongoose.model('Product',productSchema)

module.exports = Product