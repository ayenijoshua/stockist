const Product = require('../models/product')

module.exports = async function(req,res,next){
    const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).send('Product not found')

    next()
}