const frontPageMessageController = require('../controllers/frontPageMessageController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateOrder = require('../middlewares/validateOrder')
const express = require('express')
const multer = require('multer')

const router = express.Router()

router.post('/', (req,res)=>{
    new frontPageMessageController().create(req,res)
})

router.get('/', (req,res)=>{
    new frontPageMessageController().show(req,res)
})


module.exports = router