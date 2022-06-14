const User = require('../models/registeredUser')

module.exports = async function(req,res,next){
    if(req.params.token == undefined) return res.status(400).send({message:'Token not found, please try the process again'})
    const user = await User.findOne({token:req.params.token})
    if(!user) return res.status(400).send({message:'Token does not exist, please try the process again'})
    req.token = user

    next()
}