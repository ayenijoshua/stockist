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
    }
)

const Order = mongoose.model('Order',orderSchema)

module.exports = Order