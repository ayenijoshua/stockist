const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const validateObjectId = require('../middlewares/validateObjectId')
const validateUser = require('../middlewares/validateUser')
const multer = require('multer')
const path = require('path')

//const upload = multer().single('image')

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/pops/')
    },
    filename: (req, file, cb)=> {
        const fileExt = '.'+file.mimetype.split('/')[1]
        cb(null, Date.now() + '-' + `pop-${Math.floor(Math.random() * 1000)}${fileExt}`)
    }
})

const storageUpload = multer({
    storage: uploadStorage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    },
    limits:{fileSize:1048576}
})

function checkFileType(file,cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true)
    }
    cb('Error: only images are supported')
}

//const controller = new UserController()

router.get('/total', (req,res)=>{
    new UserController(req,res).totalUsers()
})

router.get('/',  (req,res)=>{
    new UserController(req,res).index() 
})

router.post('/', storageUpload.single('image'), (req,res)=>{
    new UserController(req,res).create()
})

router.put('/:id', [validateObjectId,validateUser], (req,res)=>{
    new UserController(req,res).update()
})

router.get('/:id', validateObjectId, (req,res)=>{
    new UserController(req,res).show()
})

router.delete('/:id', validateObjectId, (req,res)=>{
    new UserController(req,res).delete()
})




module.exports = router