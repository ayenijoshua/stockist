const User = require('../models/user')
const winston = require('winston')
const userRequest = require('../requests/userRequest')

class UserController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
        this.query = req.query
    }

    async index(){
        try {
            let pageNum = this.query.pageNum || 1
            let pageSize = this.query.pageSize || 100
            let users = await User.find().select(['-password','-token'])
                .skip((pageNum-1)*pageSize)
                .limit(pageSize)
            return this.res.send(users)
        } catch (error) {
            console.error(error)
            winston.error(new Error(error))  
            return res.status(500).send("An error occured while fetching users")
        }
        
    }

    async create(){
        try {
            //console.log(this.body.address)
            const {error} = userRequest.validate(this.body)
            if(error){
                //console.log(error.details[0].message)
                userRequest.deleteUploadedImage(this.req.file.filename)
                return this.res.status(422).send({message:error.details[0].message})
            } 

            // const user = await userRequest.emailExists(false,{email:this.body.email})
            // if(user){
            //     //console.log(emailExists)
            // //     const pop = await userRequest.uploadTemporaryPop(this.req.file)
            // //    if(! pop.isValid){
            // //        return this.res.status(422).send({message:pop.message})
            // //    }

            //     let updatedUser = await User.findByIdAndUpdate(user._id,{
            //         temporaryPOP:this.req.file.filename,
            //         temporaryDeliveryType:this.body.deliveryType
            //     })

            //     if(! updatedUser){
            //         return this.res.status(422).send({message:'User not found'})
            //     }

            //     return this.res.send(user)
            // }

            // const pop = await userRequest.uploadTemporaryPop(this.req.file)
            // if(! pop.isValid){
            //     return this.res.status(422).send({message:pop.message})
            // }
            this.body.temporaryPOP = this.req.file.filename
            this.body.temporaryDeliveryType = this.body.deliveryType

            delete this.body.deliveryType

            const newUser = await new User(this.body).save()
            const respUser = await User.findById(newUser._id).select(['-password','-token'])
            return this.res.send(respUser)
            
        } catch (error) {
            console.error(error)
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while creating users")
        }
    }

    async show(){
        try {
            const user = await User.findById(this.id).select(['-password','-token'])
            if (!user) return this.res.status(404).send('Id not found')

            return this.res.send(user)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching user")
        }
    }

    async update(){
        try {
            const {error} = userRequest.validate(this.body)
            if(error) return this.res.status(422).send(error.details[0].message)

            if(userRequest.emailExists(true,{id:this.id,email:this.body.email})){
                return this.res.send({success:false,message:"Email has been taken"})
            }

            const user = await User.findByIdAndUpdate(this.id,this.body)
            if (!user) return this.res.status(404).send('Id not found')

            return this.res.send(user)

        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while updating user")
        }
    }

    async delete(){
        try {
            const user = User.findByIdAndRemove(this.id)
            if (!user) return this.res.status(404).send('Id not found')

            this.res.send(user)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting user")
        }
    }

    async totalUsers(){
        try {
            // let users = await User.aggregate([
            //     {
            //         $match:{
            //             idNumber:{$not:{$size:0}}
            //         }
            //     },
            //     {$unwind: "$idNumber"},
            //     {
            //         $group:{_id:"$idNumber",total:{$count:"$idNumber"}}
            //     }
            // ]) //await User.find().count()
            let users = await User.find({isAdmin:false}).distinct('idNumber')
            return this.res.send({total:users.length})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while counting user")
        }
    }
}

module.exports = UserController