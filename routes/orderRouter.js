const OrderCntroller = require('../controllers/orderController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateOrder = require('../middlewares/validateOrder')
const express = require('express')
const multer = require('multer')

const router = express.Router()

const upload = multer().single('image')

router.get('/', (req,res)=>{
    new OrderCntroller(req,res).index()
})

router.post('/', upload, async (req,res)=>{
    //console.log(req.file)
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