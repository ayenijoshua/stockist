const mongoose = require('mongoose')

module.exports = function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('Object ID was not found.');
    }
    next()
}