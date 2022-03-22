const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateProduct = require('../middlewares/validateProduct')
const multer = require('multer')
const path = require('path')

const upload = multer().single('image')

// function checkFileType(file,cb){
//     const fileTypes = /jpeg|jpg|png|gif/
//     const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
//     const mimetype = fileTypes.test(file.mimetype)

//     if(mimetype && extname){
//         return cb(null,true)
//     }
//     cb('Error: only images are supported')
// }

router.get('/', (req,res)=>{
    new ProductController(req,res).index()
})

router.post('/', upload, async (req,res)=>
{
    new ProductController(req,res).create()
})

router.get('/:id', [validateObjectId,validateProduct], (req,res)=>{
    new ProductController(req,res).show()
})

router.put('/:id', [upload,validateObjectId,validateProduct], (req,res)=>{
    new ProductController(req,res).update()
})

router.delete('/:id', [validateObjectId,validateProduct], (req,res)=>{
    new ProductController(req,res).delete()
})

router.get('/total', (req,res)=>{
    new ProductController(req,res).totalProducts()
})

module.exports = router
