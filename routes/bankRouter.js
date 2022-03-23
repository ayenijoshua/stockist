const express = require('express')
const router = express.Router()
const BankController = require('../controllers/bankController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateBank = require('../middlewares/validateBank')

router.get('/',  (req,res)=>{
    new BankController(req,res).index() 
})

router.post('/', (req,res)=>{
    new BankController(req,res).create()
})

router.put('/:id', [validateObjectId,validateBank], (req,res)=>{
    new BankController(req,res).update()
})

router.get('/:id', validateObjectId, (req,res)=>{
    new BankController(req,res).show()
})

router.delete('/:id', validateObjectId, (req,res)=>{
    new BankController(req,res).delete()
})

module.exports = router