const Order = require('../models/order')

module.exports = async function(req,res,next){
    const order = await Order.findById(req.params.id)
    if(!order) return res.status(404).send('Order not found')

    next()
}