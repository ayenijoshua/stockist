const winston = require('winston')
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    const db = config.get('db')
    mongoose.connect(db)
    .then(()=> winston.info(`connected to ${db}`))
    .catch(err=> console.error(`not connected to mongodb`,err))
}