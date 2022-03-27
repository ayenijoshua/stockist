const web = require('../routes/web')
const users = require('../routes/userRouter')
const products = require('../routes/productRouter')
const orders = require('../routes/orderRouter')
const frontPageMessage = require('../routes/frontPageRouterMessage')
const bank = require('../routes/bankRouter')
const companyContact = require('../routes/companyContactRouter')
const auth = require('../routes/authRouter')

module.exports = function(app){
    app.use('/',web)
    app.use('/api/v1/users',users)
    app.use('/api/v1/products',products)
    app.use('/api/v1/orders',orders)
    app.use('/api/v1/front-page-message',frontPageMessage)
    app.use('/api/v1/banks',bank)
    app.use('/api/v1/company-contact',companyContact)
    app.use('/api/v1/auth',auth)
}