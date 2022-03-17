const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateUser = require('../middlewares/validateUser')
const multer = require('multer')

const upload = multer().single('image')

//const controller = new UserController()

router.get('/',  (req,res)=>{
    new UserController(req,res).index() 
})

router.post('/', upload, (req,res)=>{
    new UserController(req,res).create()
})

router.put('/:id', [validateObjectId,validateUser], (req,res)=>{
    new UserController(req,res).update()
})

router.get('/:id', validateObjectId, (req,res)=>{
    new UserController(req,res).show()
})

router.delete('/:id', validateObjectId, (req,res)=>{
    new UserController(req,res).delete()
})

module.exports = router