const User = require('../models/user')

module.exports = async function(req,res,next){
    if(req.user == undefined) return res.status(400).send({message:'request user not found'})
    if(!req.user.isAdmin) return res.status(403).send({message:'Unauthorized access'})
    
    next()
}