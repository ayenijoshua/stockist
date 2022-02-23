const multer = require('multer')
const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const validateObjectId = require('../middlewares/validateObjectId')

const upload = multer()

router.get('/', (req,res)=>{
    new ProductController(req,res).index()
})

router.post('/',  async (req,res)=>{
    await new ProductController(req,res).create()
})

router.get('/:id', validateObjectId, (req,res)=>{
    new ProductController(req,res).show()
})

router.put('/:id', validateObjectId, (req,res)=>{
    new ProductController(req,res).update()
})

router.delete('/:id', validateObjectId, (req,res)=>{
    new ProductController(req,res).delete()
})

module.exports = router
