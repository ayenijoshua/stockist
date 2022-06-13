const User = require('../models/registeredUser')
const RegisteredUser = require('../models/registeredUser')
const request = require('../requests/registeredUserRequest')
const { send } = require('./emailController')

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
            let authUser = await User.findOne({email:this.body.email, password:this.body.password})
            if(!authUser){
               return  this.res.status(422).send({message:'Invalid credentials'})
            }
            // let pass = await User.findOne({password:this.body.password})
            // if(!pass){
            //     return this.res.status(422).send({message:'User password mismatch'})
            // }

            let token = Math.random() * 1000000000

            let user = await User.findByIdAndUpdate(authUser._id,{token:token})
            if(!user){
                return this.res.status(400).send({message:'Unable to update user token'})
            }
            user = await User.findById(authUser._id)
            //console.log(user)
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

            let error1 = await request.emailExists(this.body.email)
            if(error1==true) return this.res.status(422).send({message:'Email already exists'})

            let error2 = await request.usernameExists(this.body.username)
            if(error2==true) return this.res.status(422).send({message:'Username already exists'})

            let error3 = await request.referralExists(this.body.referrer)
            if(error3==false) return this.res.status(422).send({message:'Referrer does not exist'})

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

    async forgotPasswordLink(){
        try {
            const email = await RegisteredUser.findOne({email:this.body.email})
            if(!email){
                return this.res.status(400).send({message:'Email does not exist'})
            }

            let token = Math.random() * 1000000000
            await RegisteredUser.findByIdAndUpdate(email._id,{token:token});

            let data = {
                recipient: this.body.email,
                subject:"LILONG-HERO Reset Password",
                html:`<div>
                        <h3>Forgot your password?</h3>
                        <p>We recieved a request to reset the password for your account.
                        To reset your password, click this 
                        <a href="http://app.lilonghero.com/reset-password/${token}"> Reset Password </a> to reset your password.
                        if this was a mistake, just ignore this email and nothing will happen.
                        </p> 
                      </div>`          
                }

            if(! await send(data)){
                return this.res.status(400).send({message:'Error Unable to send mail'})
            }
            return this.res.send()
            
        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while resetting password'})   
        }
    }

    async resetPassword(){
        try {
            delete this.body.token
            const {error} = request.resetPassword(this.body)
            if(error) return this.res.status(422).send({message:error.details[0].message})

            if(this.body.password != this.body.password_confirmation){
                return this.res.status(422).send({message:'Password and its confirmation are not equal'})
            }

            let id = this.req.token._id
            if(! await RegisteredUser.findByIdAndUpdate(id,{password:this.body.password})){
                return  this.res.status(400).send({message:'Unable to change password, please try again'})
            }

            return this.res.send()

        } catch (error) {
            console.log(new Error(error))
            return this.res.status(500).send({message:'An error occured while updating password'})   
        }
    }
}

module.exports = AuthController