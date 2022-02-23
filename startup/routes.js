const web = require('../routes/web')
const users = require('../routes/userRouter')
const products = require('../routes/productRouter')

module.exports = function(app){
    app.use('/',web)
    app.use('/api/users',users)
    app.use('/api/products',products)
}