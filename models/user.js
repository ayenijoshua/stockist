const { string } = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:5
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:false
        },
        address:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        
        isAdmin:{
            type:Boolean,
            default:false
        },
        created_at:{
            type:Date,
            default: Date.now
        },
        temporaryPOP:{
            type:String
        },
        temporaryDeliveryType:{
            type:String
        },
        token:{
            type:String
        },
        username:{
            type:String
        },
        bankName:{
            type:String
        },
        accountNumber:{
            type:String
        },
        uplineUsername:{
            type:String
        },
        sponsorName:{
            type:String
        },

        sponsorUsername:{
            type:String
        },
        sponsorBankName:{
            type:String
        },
        sponsorAccountNumber:{
            type:String
        },

        sponsorState:{
            type:String
        },

    }
)

const User = mongoose.model('User',userSchema)

module.exports = User