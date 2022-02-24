const User = require('../models/user')

module.exports = async function(req,res,next){
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send('User not found')

    next()
}