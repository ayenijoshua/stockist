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
            unique:true
        },
        password:{
            type:String,
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
        sponsorName:{
            type:String,
            required:true
        },
        idNumber:{
            type:String
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    }
)

const User = mongoose.model('User',userSchema)

module.exports = User