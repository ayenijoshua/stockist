const OrderCntroller = require('../controllers/orderController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateOrder = require('../middlewares/validateOrder')
const express = require('express')
const multer = require('multer')

const router = express.Router()

const upload = multer({
    //storage:storage,
    limits:{fileSize:1000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
}).single('image')

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
    new OrderCntroller(req,res).index()
})

router.post('/', upload, (req,res)=>{
    new OrderCntroller(req,res).create()
})

router.get('/:id',[validateObjectId,validateOrder], (req,res)=>{
    new OrderCntroller(req,res).show()
})

router.put('/:id',[validateObjectId,validateOrder],(req,res)=>{
    new OrderCntroller(req,res).update()
})

router.delete('/:id', [validateObjectId,validateOrder],(req,res)=>{
    new OrderCntroller(req,res).delete()
})

router.patch('/:id/approve',[validateObjectId,validateOrder],(req,res)=>{
    new OrderCntroller(req,res).approveOrder()
})

router.patch('/:id/disapprove',[validateObjectId,validateOrder],(req,res)=>{
    new OrderCntroller(req,res).disapproveOrder()
})

module.exports = router