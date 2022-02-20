const express = require('express')
const app = express()
const winston = require('winston')
const config = require('config')
const cors = require('cors')
const path = require('path')

const corsOption = {
    origin:`${config.get('origin')}:${config.get('port')}`
}

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOption))
