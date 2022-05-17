const RegisteredUser = require('../models/registeredUser')
const PhoneNumber = require('../models/phoneNumber')
const phoneNumbepRequest = require('../requests/phoneNumberRequest')
const SmsController = require('../controllers/smsController')

module.exports = class RegisteredUserController{

    constructor(req,res){
        this.req = req
        this.res = res
        this.body = req.body
        this.id = req.params.id
        this.username = req.params.username
        this.query = req.query
    }

    async index(){
        try {
            let pageNum = this.query.pageNum || 1
            let pageSize = this.query.pageSize || 100
            let users = await RegisteredUser.find({isAdmin:false}).select(['-password','-token'])
                .skip((pageNum-1)*pageSize)
                .limit(pageSize)
            return this.res.send(users)
        } catch (error) {
            console.error(error)
            winston.error(new Error(error))  
            return res.status(500).send("An error occured while fetching users")
        }
    }

    async referredMembers(){
        try {
            const members = await RegisteredUser.find({referrer:this.username}).select('-password')
            return this.res.send(members)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching downlines")
        }
    }


    async totalReferredMembers(){
        try {
            const total = await RegisteredUser.find({referrer:this.username}).count()
            return this.res.send(total)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while counting total downlines")
        }
    }

    async sendSms(){
        try {
            
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while counting user")
        }
    }

    async addPhoneNumber(){
        try {
            console.log(this.body.phones)
            const phones = this.body.phones.split(',')
            let number = phoneNumbepRequest.numerIsValid(phones)
            if(!number.isValid){
                return this.res.status(422).send({message:`${number.number} is invalid`})
            }
            
            const user = this.req.user
            phones.forEach(async element => {
                if(! await PhoneNumber.findOne({phone:element})){
                    await new PhoneNumber({
                        user:user._id,
                        phone:element,
                        smsCount:0
                    }).save()
                }
            });

            new SmsController(this.req,this.res).sendSms(user)

            //return this.res.send()
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while adding phones")
        }
    }

    async phoneNumbers(){
        try {
            const phones = PhoneNumber.find({})
            return this.res.send(phones)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while adding phones")
        }
    }

    async userPhoneNumbers(){
        try {
            const phones = PhoneNumber.find({username:this.username})
            return this.res.send(phones)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching user phones")
        }
    }

    async searchByDate()
    {
        try {
            let users = await RegisteredUser.find({isAdmin:false, createdAt:{$gte:new Date(this.query.date_from).toISOString(), 
                $lte:new Date(this.query.date_to).toISOString()}}).select(['-token','-password'])
            return this.res.send(users)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while searching by date")
        }
    }
}