const User = require('../models/user')
const winston = require('winston')
const userRequest = require('../requests/userRequest')
const { findByIdAndRemove } = require('../models/user')

class UserController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
    }

    async index(){
        try {
            const users = await User.find().select('-password')
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
                return this.res.status(422).send(error.details[0].message)

            } 
            const emailExists = await userRequest.emailExists(false,{email:this.body.email})
            if(emailExists){
                console.log(emailExists)
                return this.res.status(422).send({message:"Email already exist"})
            }

            const user = await new User(this.body).save()

            return this.res.send(user)
            
        } catch (error) {
            console.error(error)
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while creating users")
        }
    }

    async show(){
        try {
            const user = await User.findById(this.id).select('-password')
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
}

module.exports = UserController