const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:false
        },
        smsMessage:{
            type:String,
            required:false
        }
    }
)

const CompanyContact = mongoose.model('CompanyContact',companySchema)

module.exports = CompanyContact