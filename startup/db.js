const winston = require('winston')
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    const db = config.get('db')
    const conn = mongoose.connect(db)
    .then(function(con){
        // console.log(con)
          winston.info(`connected to ${db}`)
        
    })
    .catch(err=> console.error(`not connected to mongodb`,err))
    // console.log(conn)
    //  conn.users.update(
    //         {},
    //         [
    //             {
    //                 $unset: "email",
    //                 $set: {
    //                     email:{
    //                         type:String,
    //                         required:true,
    //                     },
    //                 },
    //             }
    //         ],
    //         { multi: true }
    //       )
}