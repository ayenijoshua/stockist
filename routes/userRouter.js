const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const validateObjectId = require('../middlewares/validateObjectId')

//const controller = new UserController()

router.get('/',  (req,res)=>{
    new UserController(req,res).index() 
})

router.post('/',  (req,res)=>{
    new UserController(req,res).create()
})

router.put('/:id', validateObjectId, (req,res)=>{
    return  new UserController(req,res).update()
})

router.get('/:id', validateObjectId, (req,res)=>{
    return  new UserController(req,res).show()
})

router.delete('/:id', validateObjectId, (req,res)=>{
    return  new UserController(req,res).delete()
})

module.exports = router