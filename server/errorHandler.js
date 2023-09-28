const {Error: {ValidationError, CastError}} = require('mongoose');

module.exports.errorHandler = async (err, req, res, next) => {
    if(err instanceof ValidationError) {
        return res.status(400).send(err.message)
    }
    if(err instanceof CastError) {
        return res.status(404).send(err.message)
    } 
    else {
        return res.status(500).send(err.message)
    }
}