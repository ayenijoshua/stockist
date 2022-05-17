const mongoose = require('mongoose')

const phoneNumbersSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'RegisteredUser'
        },
        phone:{
            type:String,
            required:true
        },
        smsCount:{
            type:Number,
            default:0
        },
        createdAt:{
            type:Date,
            default: Date.now
        }
        
    }
)

const PhoneNumber = mongoose.model('PhoneNumber',phoneNumbersSchema)

module.exports = PhoneNumber