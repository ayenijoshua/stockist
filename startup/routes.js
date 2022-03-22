const web = require('../routes/web')
const users = require('../routes/userRouter')
const products = require('../routes/productRouter')
const orders = require('../routes/orderRouter')
const frontPageMessage = require('../routes/frontPageRouterMessage')

module.exports = function(app){
    app.use('/',web)
    app.use('/api/v1/users',users)
    app.use('/api/v1/products',products)
    app.use('/api/v1/orders',orders)
    app.use('/api/v1/front-page-message',frontPageMessage)
}