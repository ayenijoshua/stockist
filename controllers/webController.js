const message = require('../models/frontPageMessage')

class WebController {

    constructor(){
    }

    async index(req,res){
        try {
            const messge = await message.find()
            let messageAvailable = false
            if(messge[0].option != undefined){
                messageAvailable = true
            }
            return res.render('index',{msg:messge[0],available:messageAvailable})
        } catch (error) {
            console.error(error)
            return res.status(500).send("An error occured")
        }
    }
}

module.exports = WebController