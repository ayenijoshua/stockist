const Product = require('../models/product')
const winston = require('winston')
const productRequest = require('../requests/productRequest')

class ProductController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
    }

    async index(){
        try {
            const products = await Product.find()
            return this.res.send(products)
        } catch (error) {
            winston.error(new Error(error))
            return res.status(500).send("An error occured while fetching products")
        }
        
    }

    async create(){
        try {
            const {error} = productRequest.validate(this.body)
            if(error) return this.res.status(422).send(error.details[0].message)

            if(productRequest.nameExists()){
                return this.res.send({success:false,message:"Name already exist"})
            }

            const product = await new Product(this.body).save()

            return this.res.send({success:true,product:product})
            
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while creating products")
        }
    }

    async show(){
        try {
            const product = await Product.findById(this.id)
            if (!product) return this.res.status(404).send('Id not found')

            return this.res.send(product)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching product")
        }
    }

    async update(){
        try {
            const {error} = productRequest.validate(this.body)
            if(error) return this.res.status(422).send(error.details[0].message)

            if(productRequest.emailExists(true,this.id)){
                return this.res.send({success:false,message:"Name already exist"})
            }

            const product = await Product.findByIdAndUpdate(this.id,this.body)
            if (!product) return this.res.status(404).send('Id not found')

            return this.res.send(product)

        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while updating product")
        }
    }

    async delete(){
        try {
            const product = Product.findByIdAndRemove(this.id)
            if (!product) return this.res.status(404).send('Id not found')

            this.res.send(product)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting product")
        }
    }
}

module.exports = ProductController