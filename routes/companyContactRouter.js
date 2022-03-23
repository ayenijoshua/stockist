const express = require('express')
const router = express.Router()
const CompanyContactController = require('../controllers/companyContactController')
const validateObjectId = require('../middlewares/validateObjectId')

router.get('/',  (req,res)=>{
    new CompanyContactController(req,res).index() 
})

router.post('/', (req,res)=>{
    new CompanyContactController(req,res).create()
})

router.put('/:id', validateObjectId, (req,res)=>{
    new CompanyContactController(req,res).update()
})

router.get('/:id', validateObjectId, (req,res)=>{
    new CompanyContactController(req,res).show()
})

router.delete('/:id', validateObjectId, (req,res)=>{
    new CompanyContactController(req,res).delete()
})

module.exports = router