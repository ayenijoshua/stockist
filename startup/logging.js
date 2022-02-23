
const winston = require('winston')
//require('winston-mongodb')
//const morgan = require('morgan')

module.exports = function(){ 
    /** winston.handleExceptions works for this
    process.on('uncaughtException',(ex)=>{
        console.log("An uncaught exception occured")
        winston.error(ex.message,ex)
    })**/

    /**
     * this doesn't catch unhandled promise rejection exceptions
     * but using throw ex (on process.on(unhandledRejection)), can be used to hack this
     */
    winston.handleExceptions(
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({filename:'logger/uncaught-exceptions.log'})
    )

    process.on('unhandledRejection',(ex)=>{
        //console.log("An unhandled rejection exception occured")
        //winston.error(ex.message,ex)
        throw ex
    })

    winston.add(new winston.transports.File({filename:'logger/errors.log'}))
    winston.add(new winston.transports.Console({colorize:true,prettyPrint:true,errors:{stack:true},timestamp:true})) 
    //winston.add(winston.transports.MongoDB, {db:'mongodb://localhost/playground'}) 
}