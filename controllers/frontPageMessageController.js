const message = require('../models/frontPageMessage')
const request = require('../requests/frontPageMessageRequest')


class FrontPageMessage {

    async create(req,res){
        try {
            const {error} = request.validate(req.body)
            if(error) return res.status(422).send({message:error.details[0].message})
            const messag = await message.find()
            if(messag.length == undefined || messag.length==0){
                await new message(req.body).save()
                return res.send()
            }
            const id = messag[0]._id
            await message.findByIdAndUpdate(id,req.body)
            res.send() 
        } catch (error) {
            console.error(error)
            res.status(500).send({message:'An internal error occured'})
        }
    }

    async show(req,res){
        try {
            const mess = await message.find()
            return res.send(mess[0])
        } catch (error) {
            console.error(error)
            res.status(500).send({message:'An internal error occured'})
        }
    }
}

module.exports = FrontPageMessage