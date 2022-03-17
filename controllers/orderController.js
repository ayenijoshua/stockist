const Order = require('../models/order')
const Product = require('../models/product')
const User = require('../models/user')
const winston = require('winston')
const request = require('../requests/orderRequest')
const mongoose = require('mongoose')
const Fawn = require('fawn')
const config = require('config');

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
            const orders = await Order.find().populate('user')
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
            const order = await Order.findByIdAndUpdate(this.params.id,{
                status:'approved'
            })
            return this.res.send()
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

}

module.exports = OrderCntroller