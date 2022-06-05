const mongoose = require('mongoose')

const registeredUserSchema = mongoose.Schema(
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
        username:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        referrer:{
            type:String,
            //required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        token:{
            type:String
        },
        
        createdAt:{
            type:Date,
            default: Date.now
        }
        
    }
)

const RegisteredUser = mongoose.model('RegisteredUser',registeredUserSchema)

module.exports = RegisteredUser