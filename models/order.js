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
            type:[mongoose.Types.ObjectId],
            required:true,
            ref:'Product'
        },
        status:{
            type:String,
            default:'unapproved'
        }
    }
)

const Order = mongoose.model('Order',orderSchema)

module.exports = Order