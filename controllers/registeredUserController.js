const RegisteredUser = require('../models/registeredUser')
const PhoneNumber = require('../models/phoneNumber')
const phoneNumbepRequest = require('../requests/phoneNumberRequest')
const SmsController = require('../controllers/smsController')
const SmsMessage = require('../models/smsMessage')
const smsApi = require('../external-api/smart-sms-solutions')

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
            let users = await RegisteredUser.find({isAdmin:false,isInvestor:false}).select(['-password','-token'])
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
            //console.log(this.username)
            const members = await RegisteredUser.find({referrer:this.username}).select('-password')
            console.log(members)
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

            const msg = await SmsMessage.find()

            if(msg.length > 0){
                //console.log(phones)
                let data = {
                    phones: this.body.phones,
                    message: user==null ? msg[0].message : `${msg[0].message} To register: https://app.lilonghero.com/register/${user.username} For More Info: ${user.phone}`
                }
                
                if(await smsApi.sendSMS(data)){
                    return this.res.send()
                }else{
                    return this.res.status(400).send({message:'Please Kindly try again'})
                }
            }else{
                return this.res.status(400).send({message:'SMS configuration not set'})
            }

            //new SmsController(this.req,this.res).sendSms(user)

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
            //console.log(new Date(this.query.date_from).toISOString())
            if( this.query.date_from != 'null' &&  this.query.date_to != 'null' && this.query.username !== 'null'){
                var users = await RegisteredUser.find({isAdmin:false, isInvestor:false, 
                    createdAt:{
                        $gte:new Date(this.query.date_from).toISOString(), 
                        $lte:new Date(this.query.date_to).toISOString()
                    },
                    username:this.query.username
                }).select(['-token','-password'])
            }

            else if( this.query.date_from !== 'null' &&  this.query.date_to !== 'null'){
                var users = await RegisteredUser.find({isAdmin:false, isInvestor:false,
                    createdAt:{
                        $gte:new Date(this.query.date_from).toISOString(), 
                        $lte:new Date(this.query.date_to).toISOString()
                    },
                }).select(['-token','-password'])
            }

            else if( typeof this.query.username != 'null'){
                var users = await RegisteredUser.find({isAdmin:false,isInvestor:false, username:this.query.username}).select(['-token','-password'])
            }

            else{
                var users = await RegisteredUser.find({isAdmin:false,isInvestor:false,}).select(['-token','-password'])
            }
            
            return this.res.send(users)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while searching members")
        }
    }

    async searchInvestor()
    {
        try {
            //console.log(new Date(this.query.date_from).toISOString())
            if( this.query.date_from != 'null' &&  this.query.date_to != 'null' && this.query.username !== 'null'){
                var users = await RegisteredUser.find({isAdmin:false, isInvestor:true, 
                    createdAt:{
                        $gte:new Date(this.query.date_from).toISOString(), 
                        $lte:new Date(this.query.date_to).toISOString()
                    },
                    username:this.query.username
                }).select(['-token','-password'])
            }

            else if( this.query.date_from !== 'null' &&  this.query.date_to !== 'null'){
                var users = await RegisteredUser.find({isAdmin:false, isInvestor:true,
                    createdAt:{
                        $gte:new Date(this.query.date_from).toISOString(), 
                        $lte:new Date(this.query.date_to).toISOString()
                    },
                }).select(['-token','-password'])
            }

            else if( typeof this.query.username != 'null'){
                var users = await RegisteredUser.find({isAdmin:false,isInvestor:true, username:this.query.username}).select(['-token','-password'])
            }

            else{
                var users = await RegisteredUser.find({isAdmin:false,isInvestor:true,}).select(['-token','-password'])
            }
            
            return this.res.send(users)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while searching Investors")
        }
    }

    async investors()
    {
        try {
            let users = await RegisteredUser.find({isInvestor:true}).select(['-token','-password'])
            return this.res.send(users)
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching investors")
        }
    }

    async total(){
        try {
            const total = await RegisteredUser.find({isAdmin:false,isInvestor:false}).count()
            return this.res.send({total:total})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while counting total memebers")
        }
    }

    async deleteUser()
    {
        try {
            const remove = await RegisteredUser.findByIdAndDelete(this.id)
            if(! remove){
                return this.res.send({message:'User not found'})
            }
            return this.res.send({message:'User delete successfully'})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting investors")
        }
    }
}