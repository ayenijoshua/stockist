const OrderController = require('../controllers/orderController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateOrder = require('../middlewares/validateOrder')
const express = require('express')
const multer = require('multer')

const router = express.Router()

const upload = multer().single('image')

router.get('/total', (req,res)=>{
    new OrderController(req,res).totalOrders()
})

router.get('/status/:status', (req,res)=>{
    new OrderController(req,res).ordersByStatus()
})

router.get('/totalSales', (req,res)=>{
    new OrderController(req,res).totalSales()
})

router.get('/', (req,res)=>{
    new OrderController(req,res).index()
})

router.post('/', upload, async (req,res)=>{
    //console.log(req.file)
    new OrderController(req,res).create()
})

router.get('/:id',[validateObjectId,validateOrder], (req,res)=>{
    new OrderController(req,res).show()
})

router.put('/:id',[validateObjectId,validateOrder],(req,res)=>{
    new OrderController(req,res).update()
})

router.delete('/:id', [validateObjectId,validateOrder],(req,res)=>{
    new OrderController(req,res).delete()
})

router.patch('/:id/approve',[validateObjectId,validateOrder],(req,res)=>{
    new OrderController(req,res).approveOrder()
})

router.patch('/:id/disapprove',[validateObjectId,validateOrder],(req,res)=>{
    new OrderController(req,res).disapproveOrder()
})


module.exports = router