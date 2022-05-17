const RegisteredUser = require('../models/registeredUser')

module.exports = async function(req,res,next){
    const registeredUser = await RegisteredUser.find({user:req.params.userId})
    if(!registeredUser) return res.status(404).send('registered User not found')

    next()
}