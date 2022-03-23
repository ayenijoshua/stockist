const { string } = require('joi')
const mongoose = require('mongoose')

const bankSchema = mongoose.Schema(
    {
        bankName:{
            type:String,
            required:true,
        },
        accountName:{
            type:String,
            required:true,
        },
        accountNumber:{
            type:String,
            required:false
        },
    }
)

const Bank = mongoose.model('Bank',bankSchema)

module.exports = Bank