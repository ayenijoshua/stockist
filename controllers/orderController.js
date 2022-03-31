const Order = require('../models/order')
const Product = require('../models/product')
const User = require('../models/user')
const winston = require('winston')
const request = require('../requests/orderRequest')
const mongoose = require('mongoose')
const Fawn = require('fawn')
const config = require('config');
const { map } = require('lodash')

const db = config.get('db')
Fawn.init(db)

class OrderCntroller {

    constructor(req,res){
        this.body = req.body
        this.res = res
        this.params = req.params,
        this.query = req.query
    }

    async index(){
        try {
            let pageNum = this.query.pageNum || 1
            let pageSize = this.query.pageSize || 100
            let orders = await Order.find().populate('user').select(['-password','-token'])
                .skip((pageNum-1)*pageSize)
                .limit(pageSize)
            return this.res.send(orders)
        } catch (error) {
            console.error(error)
            return res.status(500).send("An error occured while fetching orders")
        }
    }

    async create(){
        try {
            let {orderError} = request.validateOrderData(this.body)
            if(orderError){
               return this.res.status(422).send({message:orderError.details[0].message})
            }

            // let {userError} = request.validateUserData(userData)
            // if(userError){
            //     return this.res.status(422).send({message:userError.details[0].message})
            // }

            //console.log(orderData)

            const prod = await request.productExists(this.body.products)
            if(!prod.isValid){
               return this.res.status(422).send({message:`Product ${prod.product} not found`})
            }

            const user = await request.userExists(this.body.userId)
            if(!user){
                //create user
                // let newUser = {
                //     name:userData.name,
                //     email:userData.email,
                //     address:userData.address,
                //     sponsorName:userData.sponsorName,
                //     phone:userData.phone,
                //     idNumber:userData.idNumber,
                //     state:userData.state
                // }
                return this.res.status(422).send({message:'User not found'})
                // user =  await new User(newUser) //await new UserController(user,this.res).create()
                // //emit order-created event
                // transact = new Fawn.Task()
                // .save('users',user)

            }

            const order = await new Order({
                products:this.body.products,
                user:user._id,
                pop:user.temporaryPOP,
                totalPrice:this.body.totalPrice,
                totalQty:this.body.totalQty,
                deliveryType:user.temporaryDeliveryType,
            }).save()

            // transact.save('orders',order)
            // transact.run()
            

            return this.res.send(order)

        } catch (error) {
            console.error(error)
            return this.res.status(500).send('An error occured while creating order')
        }
    }

    async update(){
        try {
            const {error} = request.validate(this.body)
            if(error){
                return this.res.status(422).send(error.details[0].message)
            }

            const order = await Order.findByIdAndUpdate(this.params.id,this.body)

            return this.res.send(order)

        } catch (error) {
            console.log(error)
            this.res.status(500).send('An error occured while updating order')
        }
    }

    async show(){
        try {
            const order = await Order.findById(this.params.id)
            this.res.send(order).populate('user').populate('products')
        } catch (error) {
            console.error(error)
            this.res.status(500).send("An error occured while viewing order")
        }
    }

    async delete(){
        try {
            const order = await Order.findByIdAndRemove(this.req.params.id)
            return this.res.send(order)
        } catch (error) {
            console.error(error)
            this.res.status(500).send("An error occured while deleting order")
        }
    }

    async approveOrder(){
        try {
            const order = await Order.findById(this.params.id)
            //const process = new Promise((res,rej)=>{
                order.products.forEach(async ele=>{
                    let product =  await Product.findById(ele.id)
                    if(!product){
                        throw new Error("Unable to find product to be updated")
                    }
                     let newQty = product.quantity - ele.qty
                     let updtProd = await Product.findByIdAndUpdate(product._id,{quantity:newQty})
                    if(!updtProd){
                         throw new Error("Unable to update product")
                    }
                     //res()
                 })
            //})
            await Order.findByIdAndUpdate(this.params.id,{
                status:'approved'
            })

            //process.then(function(){
                return this.res.send()
            //})
            
        } catch (error) {
            console.error(error)
            return this.res.status(500).send('An error occured while approving order')
        }
    }

    async disapproveOrder(){
        try {
            const order = await Order.findByIdAndUpdate(this.params.id,{
                status:'disapproved'
            })
            return this.res.send()
        } catch (error) {
            console.error(error)
            return this.res.status(500).send('An error occured while disapproving order')
        }
    }

    async totalOrders(){
        try {
            let orders = await Order.count({status:'approved'})
            return this.res.send({total:orders})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting user")
        }
    }

    async totalSales(){
        try {
            let orders = await Order.aggregate([{$match:{status:'approved'}},
               { $group: {_id:null,totalSales:{$sum:"$totalPrice"}}}
            ])
            if(orders.length>0){
                return this.res.send({total:orders[0].totalSales})
            }
            return this.res.send({total:0})
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting user")
        }
    }

    async ordersByStatus(){
        try {
            let pageNum = this.query.pageNum || 1
            let pageSize = this.query.pageSize || 100
            let orders = await Order.find({status:this.params.status}).populate('user').select(['-password','-token'])
                .skip((pageNum-1)*pageSize)
                .limit(pageSize)
            return this.res.send(orders)
        } catch (error) {
            console.error(error)
            return this.res.status(500).send('An error occured while fetchiing pending order')
        }
    }

    async searchOrder(){
        try {
            let orders = await Order.find({created_at:{$gte:new Date(this.body.from_date).toISOString(), 
                $lte:new Date(this.body.to_date).toISOString()}}).populate('user').select(['-token','-password'])
            return this.res.send(orders)
        } catch (error) {
            console.error(error)
            return this.res.status(500).send('An error occured while searching order')
        }
    }

    async graph(){
        try {
            let orders = await Order.aggregate([{$match:{status:'approved'}},
                { $group: {_id:"$created_at",totalSales:{$sum:"$totalPrice"}}}
             ])
             //new Date().toDateString()
             let formatedOrder = orders.map(function(ele){
                 return [new Date(ele._id).toISOString().slice(0,10), ele.totalSales]
             })
             return this.res.send(formatedOrder)
        } catch (error) {
            console.error(error)
            return this.res.status(500).send('An error occured while getting graph')
        }
    }


}

module.exports = OrderCntroller