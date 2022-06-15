const RegisteredUser = require('../models/registeredUser')
const PhoneNumber = require('../models/phoneNumber')
const smsApi = require('../external-api/smart-sms-solutions')
const request = require('../requests/phoneNumberRequest')
const SmsMessage = require('../models/smsMessage')

module.exports = class SmsController{

    constructor(req,res){
        this.req = req
        this.res = res
        this.body = req.body
        this.id = req.params.userId
    }

    async sendSms(user=null){
        try {

           const nums = user==null ? await PhoneNumber.find({smsCount:0}) : await PhoneNumber.find({user:user._id,smsCount:0})
           const msg = await SmsMessage.find()
           console.log(nums)
           if(nums){
               let numbers = nums.map(function(ele){
                    return ele._id
                })
                let data = {
                    phones: nums.map(function(ele){
                        return ele.phone
                    }).join(','),
                    message: user==null ? msg[0].message : `${msg[0].message} To register: https://app.lilonghero.com/register/${user.username} For More Info: ${user.phone}`
                }

                if(typeof data.phones !== 'string' ||  data.phones === "" || !data.phones){
                    return this.res.status(400).send({message:'Please Kindly try again'})
                }

                if(await smsApi.sendSMS(data)){
                    numbers.forEach(async ele=>{
                        await PhoneNumber.findByIdAndUpdate(ele,{smsCount:1})
                    })
                    return this.res.send()
                }

                return this.res.status(400).send({message:'Please Kindly try again'})
            }
           
           return this.res.status(400).send({message:'Phones number already recieved sms'})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while counting user")
        }
    }

    // async addPhoneNumber(){
    //     try {
    //         console.log(this.body.phones)
    //         let number = request.numerIsValid(this.body.phones)
    //         if(!number.isValid){
    //             return this.res.status(422).send({message:`${number} is invalid`})
    //         }
            
    //         const user = this.req.user

    //         this.body.phones.forEach(async element => {
    //             if(! await PhoneNumber.findOne({phone:element})){
    //                 await new PhoneNumber({
    //                     user:user._id,
    //                     phone:element,
    //                     smsCount:0
    //                 }).save()
    //             }
    //         });
            
    //         this.sendSms(user)

    //         return this.res.send()
    //     } catch (error) {
    //         console.error(new Error(error))
    //         return this.res.status(500).send("An error occured while adding phones")
    //     }
    // }

    // async phoneNumbers(){
    //     try {
    //         const phones = PhoneNumber.find({})
    //         return this.res.send(phones)
    //     } catch (error) {
    //         console.error(new Error(error))
    //         return this.res.status(500).send("An error occured while adding phones")
    //     }
    // }

    // async userPhoneNumbers(){
    //     try {
    //         const phones = await PhoneNumber.find({user:this.userId})
    //         return this.res.send(phones)
    //     } catch (error) {
    //         console.error(new Error(error))
    //         return this.res.status(500).send("An error occured while adding phones")
    //     }
    // }

    async setSmsMessage(){
        try {
            //Welcome to www.lilonghero.com. We will be glad to have you as 
            //a leader in our program, To register: lilonghero.com/philip12345 For More Info: 08073448773
           
             let msg = await SmsMessage.find()
             if(!msg[0]){
               await new SmsMessage({message:this.body.message}).save()
             }else{
                await SmsMessage.findByIdAndUpdate(msg[0]._id,{message:this.body.message})
             }
             return this.res.send()
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while setting sms message")
        }
    }

    async getSmsMessage(){
        try {
            //Welcome to www.lilonghero.com. We will be glad to have you as 
            //a leader in our program, To register: lilonghero.com/philip12345 For More Info: 08073448773

             let msg = await SmsMessage.findOne()
             if(!msg){
               return this.res.status(400).send({message:'sms message not set'})
             }
             console.log(msg)
             return this.res.send(msg)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while getting sms message")
        }
    }

    async getBalance(){
        try {
            //Welcome to www.lilonghero.com. We will be glad to have you as 
            //a leader in our program, To register: lilonghero.com/philip12345 For More Info: 08073448773

             let balance = await smsApi.getBalance()
             if(!balance){
               return this.res.status(400).send({message:'Unable to get balance'})
             }
             console.log(balance)
             return this.res.send({balance:balance})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while getting sms balance")
        }
    }
}