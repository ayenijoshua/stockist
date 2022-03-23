const Bank = require('../models/bank')
const winston = require('winston')
const bankRequest = require('../requests/bankRequest')

class bankController {

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
            let banks = await Bank.find()
                .skip((pageNum-1)*pageSize)
                .limit(pageSize)
            return this.res.send(banks)
        } catch (error) {
            winston.error(new Error(error))
            return res.status(500).send("An error occured while fetching banks")
        }
    }

    async create(){
        try {
            const {error} = bankRequest.validate(this.body)
            if(error) {
                console.log(error.details[0].message)
                return this.res.status(422).send({message:error.details[0].message})
            }

            let bank = await new Bank(this.req.body).save()

            return this.res.send(bank)
            
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send({message:"An error occured while creating bank"})
        }
    }

    async show(){
        try {
            const bank = await Bank.findById(this.id)
            if (!bank) return this.res.status(404).send('Id not found')

            return this.res.send(bank)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching bank")
        }
    }

    async update(){
        try {
            const {error} = bankRequest.validate(this.body)
            if(error) {
                console.error(error)
                return this.res.status(422).send({message:error.details[0].message})
            }

            let bank = {
                bankName:this.body.bankName,
                accountName: this.body.accountName,
                accountNumber: this.body.accountNumber,
            }

            const updatedbank = await Bank.findByIdAndUpdate(this.id,bank)
            
            return this.res.send(updatedbank)

        } catch (error) {
            console.log(error)
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while updating bank")
        }
    }

    async delete(){
        try {
            const bank = await Bank.findByIdAndRemove(this.id)
            if (!bank) return this.res.status(404).send('Id not found')

            return this.res.send(bank)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting bank")
        }
    }
}

module.exports = bankController