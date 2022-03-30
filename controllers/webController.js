const message = require('../models/frontPageMessage')
const CompanyContact = require('../models/companyContact')
class WebController {

    constructor(){
    }

    async index(req,res){
        try {
            const messge = await message.find()
            const contact = await CompanyContact.find()
            let contactAvailable = false
            let messageAvailable = false

            if(messge[0]){
                messageAvailable = true
            }
            if(contact[0]){
                contactAvailable = true
            }
            return res.render('index',{msg:messge[0],available:messageAvailable, 
                cont:contact[0],contAvailable:contactAvailable})
        } catch (error) {
            console.error(error)
            return res.status(500).send("An error occured")
        }
    }
}

module.exports = WebController