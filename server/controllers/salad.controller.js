const { Salad } = require('./../models/index');

module.exports.createSalad = async (req, res, next) => {
    try {
        const { body, ingredients } = req;
        const salad = await Salad.create({...body, ingredients});
        return res.status(201).send(salad)
    } catch (error) {
        next(error)
    }
}

module.exports.getSalad = async (req, res, next) => {
    try {
        const {params: {saladId}} = req;
        const result = await Salad.findById(saladId).populate('ingredients');

        if(!result) {
            return res.status(404).send('Salad not found')
        }

        return res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllSalads = async (req, res, next) => {
    try {
        const allSalads = await Salad.find({}).populate('ingredients');
        return res.status(200).send(allSalads);
    } catch (error) {
        next(error)
    }
}

module.exports.updateSalad = async (req, res, next) => {
    try {
        const {body, params: {saladId}} = req;
        const result = await Salad.findByIdAndUpdate(saladId, body, {returnDocument: 'after'});
        return res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteSalad = async (req, res, next) => {
    try {
        const {params: {saladId}} = req;
        const result = await Salad.findByIdAndDelete(saladId);
        if(!result) {
            return res.status(400).send('Salad not found')
        }
        return res.status(200). send(result)
    } catch (error) {
        next(error);
    }
}