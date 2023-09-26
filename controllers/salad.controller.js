const { Salad } = require('./../models/index')

module.exports.createSalad = async (req, res, next) => {
    try {
        const { body } = req;
        const salad = await Salad.create(body);
        return res.status(201).send(salad)
    } catch (error) {
        next(error)
    }
}

module.exports.getSalad = async (req, res) => {
    
}

module.exports.getAllSalads = async (req, res) => {
    
}

module.exports.updateSalad = async (req, res) => {
    
}

module.exports.deleteSalad = async (req, res) => {
    try {
        const {params: {id}} = req;
        const result = await Salad.findByIdAndDelete(id);
        return res.status(200). send(result)
    } catch (error) {
        next(error);
    }
}