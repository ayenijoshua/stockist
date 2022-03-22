const Product = require('../models/product')
const winston = require('winston')
const productRequest = require('../requests/productRequest')
//const upload = require('../startup/fileUploads')

class ProductController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
        this.query = req.query
    }

    async index(){
        try {
            let pageNum = this.query.pageNum || 1
            let pageSize = this.query.pageSize || 10
            let products = await Product.find()
                .skip((pageNum-1)*pageSize)
                .limit(pageSize)
            return this.res.send(products)
        } catch (error) {
            winston.error(new Error(error))
            return res.status(500).send("An error occured while fetching products")
        }
    }

    async create(){
        try {
            //console.log(this.body)
            const {error} = productRequest.validate(this.body)
            if(error) {
                console.log(error.details[0].message)
                return this.res.status(422).send({message:error.details[0].message})
            }

            if(await productRequest.nameExists(this.body.name)){
                console.error('name exist')
                return this.res.status(422).send({message:"Product name already exist"})
            }

            const image = await productRequest.uploadImage(this.req.file)
            if(!image.isValid){
                console.error('Upload error '+image.message)
                return this.res.status(422).send({message:image.message})
            }

            let product = {
                name:this.body.name,
                title: this.body.title,
                description: this.body.description,
                quantity: this.body.quantity,
                price: this.body.price,
                imageName: image.filename
            }

            product = await new Product(product).save()

            //console.log(product)
            return this.res.send(product)
            
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send({message:"An error occured while creating products"})
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
            if(error) {
                console.error(error)
                return this.res.status(422).send({message:error.details[0].message})
            }

            const updatedNameExists = await productRequest.updatedNameExists({name:this.body.name,id:this.id})

            if(updatedNameExists){
                return this.res.status(422).send({message:"Name already exist"})
            }

            let product = {
                name:this.body.name,
                title: this.body.title,
                description: this.body.description,
                quantity: this.body.quantity,
                price: this.body.price,
            }

            if(this.req.file){
                let image = await Product.findById(this.id)
                if(image.imageName){
                    productRequest.deleteUploadedImage(image.imageName)
                }

                image = await productRequest.uploadImage(this.req.file)
                if(!image.isValid){
                    console.error('Upload error '+image.message)
                    return this.res.status(422).send({message:image.message})
                }

                product.imageName = image.filename
            }

            

            const updatedProduct = await Product.findByIdAndUpdate(this.id,product)
            
            return this.res.send(updatedProduct)

        } catch (error) {
            console.log(error)
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while updating product")
        }
    }

    async delete(){
        try {
            const product = await Product.findByIdAndRemove(this.id)
            if (!product) return this.res.status(404).send('Id not found')

            return this.res.send(product)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting product")
        }
    }

    async totalProducts(){
        try {
            let products = await Product.find().count()
            return this.req.send(products)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting user")
        }
    }
}

module.exports = ProductController