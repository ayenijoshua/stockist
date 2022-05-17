const mongoose = require('mongoose')

const smsSchema = mongoose.Schema(
    {
        message:{
            type:String,
            required:true
        }
    }
)

const SmsMessage = mongoose.model('smsMessage',smsSchema)

module.exports = SmsMessage