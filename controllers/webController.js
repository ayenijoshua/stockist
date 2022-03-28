const message = require('../models/frontPageMessage')

class WebController {

    constructor(){
    }

    async index(req,res){
        try {
            const messge = await message.find()
            return res.render('index',{msg:messge[0]})
        } catch (error) {
            console.error(error)
            return res.status(500).send("An error occured")
        }
    }
}

module.exports = WebController