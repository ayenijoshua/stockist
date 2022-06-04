const express = require('express')
const app = express()
const winston = require('winston')
const config = require('config')
const cors = require('cors')
const path = require('path')

const corsOption = {
    origin:`${config.get('origin')}`
}

const port = config.get('port')

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use('/',express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOption))

require('./startup/logging')()
require('./startup/db')()
require('./startup/routes')(app)




const server = app.listen(port, ()=>{
    winston.info("App running on "+port)
})

module.exports = server 
