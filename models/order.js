const { string } = require('joi')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'User'
        },
        products:{
            type: [new mongoose.Schema({
                _id:mongoose.Types.ObjectId,
                name:String,
                price:Number,
                qty:Number,
                totalPrice:Number,
                imageName:String
            })] 
        },
        status:{
            type:String,
            default:'unapproved'
        },
        deliveryType:{
            type: String,
            enum:['pickup','address'],
            required:true
        },
        pop:{
            type:String,
            required:true
        },
        created_at:{
            type:Date, 
            default: Date.now
        },
        totalPrice:{
            type:Number,
            required:true
        },
        totalQty:{
            type:Number,
            required:true
        }
    }
)

const Order = mongoose.model('Order',orderSchema)

module.exports = Order