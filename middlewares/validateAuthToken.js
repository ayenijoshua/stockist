const User = require('../models/user')

module.exports = async function(req,res,next){
    let autTtoken = req.header('auth-token')
    const user = await User.findOne({token:autTtoken})
    if(!user) return res.status(401).send('Invalid auth token')
    req.user = user

    next()
}