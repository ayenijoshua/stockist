const RegisteredUserController = require('../controllers/registeredUserController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateOrder = require('../middlewares/validateOrder')
const express = require('express')
const multer = require('multer')

const router = express.Router()

// router.post('/add-phones', (req,res)=>{
//     new RegisteredUserController(req,res).addPhoneNumber()
// })

router.get('/', (req,res)=>{
    new RegisteredUserController(req,res).index()
})

router.get('/:username/downlines', (req,res)=>{
    new RegisteredUserController(req,res).referredMembers()
})

router.get('/:username/total-downlines', (req,res)=>{
    new RegisteredUserController(req,res).totalReferredMembers()
})

router.get('/search', (req,res)=>{
    new RegisteredUserController(req,res).searchByDate()
})

router.get('/investors', (req,res)=>{
    new RegisteredUserController(req,res).investors()
})

router.get('/total', (req,res)=>{
    new RegisteredUserController(req,res).total()
})


module.exports = router