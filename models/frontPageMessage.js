const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        subject:{
            type:String,
            required:true,
        },
        message:{
            type:String
        },
        option:{
            type:String,
            enum:['enable','disable']
        }
    }
)

const FrontPageMessage = mongoose.model('FrontPageMessagee',orderSchema)

module.exports = FrontPageMessage