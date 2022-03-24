const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateProduct = require('../middlewares/validateProduct')
const multer = require('multer')
const path = require('path')

//const upload = multer().single('image')

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/products/')
    },
    filename: (req, file, cb)=> {
        const fileExt = file.mimetype.split('/')[1]
        console.log('file '+fileExt)
        cb(null, Date.now() + '-' + `prod-${Math.floor(Math.random() * 1000)}${fileExt}`)
    }
})

const storageUpload = multer({
    storage: uploadStorage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

function checkFileType(file,cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true)
    }
    cb('Error: only images are supported')
}

router.get('/', (req,res)=>{
    new ProductController(req,res).index()
})

router.post('/', storageUpload.single('image'), async (req,res)=>
{
    new ProductController(req,res).create()
})

router.get('/:id', [validateObjectId,validateProduct], (req,res)=>{
    new ProductController(req,res).show()
})

router.put('/:id', [storageUpload.single('image'),validateObjectId,validateProduct], (req,res)=>{
    new ProductController(req,res).update()
})

router.delete('/:id', [validateObjectId,validateProduct], (req,res)=>{
    new ProductController(req,res).delete()
})

router.get('/total', (req,res)=>{
    new ProductController(req,res).totalProducts()
})

module.exports = router
