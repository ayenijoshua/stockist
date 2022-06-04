const User = require('../models/registeredUser')
const RegisteredUser = require('../models/registeredUser')
const request = require('../requests/registeredUserRequest')

class AuthController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
        this.query = req.query
    }

    async login(){
        try {
            let authUser = await User.findOne({email:this.body.email})
            if(!authUser){
               return  this.res.status(422).send({message:'User Email not found'})
            }
            let pass = await User.findOne({password:this.body.password})
            if(!pass){
                return this.res.status(422).send({message:'User password mismatch'})
            }

            let token = Math.random() * 1000000000

            let user = await User.findByIdAndUpdate(authUser._id,{token:token})
            if(!user){
                return this.res.status(400).send({message:'Unable to update user token'})
            }
            user = await User.findById(authUser._id)
            console.log(user)
            this.res.send(user)
        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while authenticating'})
        }
        
    }

    async register(){
        try {
            let {error} = request.validate(this.body)
            if(error) return this.res.status(422).send({message:error.details[0].message})

            let error1 = request.emailExists(this.body.email)
            if(error1) return this.res.status(422).send({message:'Email already exists'})

            let error2 = request.usernameExists(this.body.username)
            if(error2) return this.res.status(422).send({message:'Username already exists'})

            let error3 = request.referralExists(this.body.referrer)
            if(error3) return this.res.status(422).send({message:'Referrer does not exist'})

            const user = await new RegisteredUser(this.body).save()
            return this.res.send(user)
        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while registering'})
        }
    }


    // async authUser(){
    //     try {
    //         const token = this.req.header('auth-token')
    //         const user = User.findOne({token:token})
    //         if(!user){
    //             return this.res.status(401).
    //         }
    //     } catch (error) {
            
    //     }
    // }

    async logout(){
        try {
            const id = this.req.user._id
            const resp = await User.findByIdAndUpdate(id,{token:null})
            return this.res.send()
        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while logging out'})
        }
        
    }
}

module.exports = AuthController