const Bank = require('../models/bank')

module.exports = async function(req,res,next){
    const bank = await Bank.findById(req.params.id)
    if(!bank) return res.status(404).send('Bank not found')

    next()
}