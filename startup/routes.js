const web = require('../routes/web')

module.exports = function(app){
    app.use('/',web)
}