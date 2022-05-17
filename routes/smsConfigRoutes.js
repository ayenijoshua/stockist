const SmsController = require('../controllers/smsController')
const auth = require('../middlewares/validateAuthToken')
const express = require('express')

const router = express.Router()

router.post('/', auth, (req,res)=>{
    new SmsController(req,res).setSmsMessage()
})

router.get('/', auth, (req,res)=>{
    new SmsController(req,res).getSmsMessage()
})

router.get('/balance', auth, (req,res)=>{
    new SmsController(req,res).getBalance()
})

module.exports = router