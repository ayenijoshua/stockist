const registeredUserController = require('../controllers/registeredUserController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateusername = require('../middlewares/validateRegisteredUser')
const auth = require('../middlewares/validateAuthToken')
const express = require('express')

const router = express.Router()

router.post('/', auth, (req,res)=>{
    new registeredUserController(req,res).addPhoneNumber()
})

router.get('/', (req,res)=>{
    new registeredUserController(req,res).phoneNumbers()
})

router.get('/:username/phones', validateusername, (req,res)=>{
    new registeredUserController(req,res).userPhoneNumbers()
})


module.exports = router