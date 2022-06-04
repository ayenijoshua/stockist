const express = require('express')
const router = express.Router()
const WebController = require('../controllers/webController')

router.get('/', (req,res)=>{
    new WebController().index(req,res)
})

router.get('*', (req,res)=>{
    return res.render('not-found')
})

module.exports = router