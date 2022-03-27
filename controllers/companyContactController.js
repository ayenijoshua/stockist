const CompanyContact = require('../models/companyContact')
const winston = require('winston')
const request = require('../requests/companyContactRequest')

class contactController {

    constructor(req,res){
        this.req = req
        this.res = res
        this.id = req.params.id
        this.body = req.body
        this.query = req.query
    }

    async index(){
        try {
            let contact = await CompanyContact.find().select(['-_id','-__v'])
            if(contact.length > 0){
                contact = contact[0]
            }
            return this.res.send(contact)
        } catch (error) {
            winston.error(new Error(error))
            return res.status(500).send("An error occured while fetching contact")
        }
    }

    async create(){
        try {
            const {error} = request.validate(this.body)
            if(error) {
                console.log(error.details[0].message)
                return this.res.status(422).send({message:error.details[0].message})
            }

            let contacts = await CompanyContact.find()
            if(contacts.length > 0){
                let contact = await CompanyContact.findByIdAndUpdate(contacts[0]._id,this.req.body)
                delete contact._id
                delete contact.__v
                return this.res.send(contact)
            }

            let contact = await new CompanyContact(this.req.body).save()

            return this.res.send(contact)
            
        } catch (error) {
            console.error(new Error(error))
            return this.res.status(500).send({message:"An error occured while creating contact"})
        }
    }

    async show(){
        try {
            const contact = await CompanyContact.findById(this.id)
            if (!contact) return this.res.status(404).send('Id not found')

            return this.res.send(contact)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while fetching contact")
        }
    }

    async update(){
        try {
            const {error} = request.validate(this.body)
            if(error) {
                console.error(error)
                return this.res.status(422).send({message:error.details[0].message})
            }

            let contact = {
                email:this.body.email,
                phone: this.body.phone,
                address: this.body.address,
            }

            const updatedContact = await CompanyContact.findByIdAndUpdate(this.id,contact)
            
            return this.res.send(updatedContact)

        } catch (error) {
            console.log(error)
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while updating contact")
        }
    }

    async delete(){
        try {
            const contact = await CompanyContact.findByIdAndRemove(this.id)
            if (!contact) return this.res.status(404).send('Id not found')

            return this.res.send(contact)
        } catch (error) {
            winston.error(new Error(error))
            return this.res.status(500).send("An error occured while deleting contact")
        }
    }
}

module.exports = contactController