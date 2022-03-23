const User = require('../models/user')
const userRequest = require('../requests/userRequest')

class AuthController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
        this.query = req.query
    }

    login(){
        try {
            let authUser = await User.findOne({email:this.body.email})
            if(!authUser){
                this.res.status(422).send({message:'User Email not found'})
            }
            authUser = await User.findOne({password:this.body.password})
            if(!authUser){
                this.res.status(422).send({message:'User password mismatch'})
            }

            let token = Math.random() * 1000000000

            let user = await User.findByIdAndUpdate(authUser._id,{token:token})
            if(!user){
                return this.res.status(400).send({message:'Unable to update user token'})
            }

            this.res.send(user)
        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while authenticating'})
        }
        
    }

    async register(){
        try {
            const {error} = userRequest.validateRegistration(this.body)
            if(error) return this.res.status(422).send({message:error.details[0].message})
            const user = await new User(this.body).save()
            return this.res.send(user)
        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while registering'})
        }
    }
}