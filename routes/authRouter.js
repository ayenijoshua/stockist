const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const autTtoken = require('../middlewares/validateAuthToken')

router.post('/login',  (req,res)=>{
    new AuthController(req,res).login() 
})

router.post('/register', (req,res)=>{
    new AuthController(req,res).register()
})

router.post('/logout', autTtoken, (req,res)=>{
    new AuthController(req,res).logout()
})

router.get('/user', autTtoken, (req,res)=>{
    return res.send(req.user)
})


module.exports = router