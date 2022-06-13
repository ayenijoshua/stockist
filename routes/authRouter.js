const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const autTtoken = require('../middlewares/validateAuthToken')
const resetToken = require('../middlewares/validateResetPassword')

router.post('/login',  (req,res)=>{
    new AuthController(req,res).login() 
})

router.post('/register', (req,res)=>{
    new AuthController(req,res).register()
})

router.post('/logout', (req,res)=>{
    new AuthController(req,res).logout()
})

router.get('/user', autTtoken, (req,res)=>{
    return res.send(req.user)
})

router.post('/reset-password-link', (req,res)=>{
    new AuthController(req,res).forgotPasswordLink()
})

router.post('/reset-password/:token', resetToken, (req,res)=>{
    new AuthController(req,res).resetPassword()
})




module.exports = router