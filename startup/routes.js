const web = require('../routes/web')
const users = require('../routes/userRouter')
const products = require('../routes/productRouter')
const orders = require('../routes/orderRouter')
const frontPageMessage = require('../routes/frontPageRouterMessage')
const bank = require('../routes/bankRouter')
const companyContact = require('../routes/companyContactRouter')
const auth = require('../routes/authRouter')
const phoneNumbers = require('../routes/phoneNumberRoutes')
const registeredUsers = require('../routes/registeredUserRoutes')
const sms = require('../routes/smsConfigRoutes')

module.exports = function(app){
    app.use('/',web)
    app.use('/api/v1/users',users)
    app.use('/api/v1/products',products)
    app.use('/api/v1/orders',orders)
    app.use('/api/v1/front-page-message',frontPageMessage)
    app.use('/api/v1/banks',bank)
    app.use('/api/v1/company-contact',companyContact)
    app.use('/api/v1/auth',auth)
    app.use('/api/v1/phone-numbers',phoneNumbers)
    app.use('/api/v1/sms',sms)
    app.use('/api/v1/registered-users',registeredUsers)

    app.use((req,res,next)=>{
        return res.render('not-found')
    })
}