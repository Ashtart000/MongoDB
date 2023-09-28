const { Ingredient } = require('../models');

module.exports.createIngredient = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await Ingredient.create(body);
        return res.status(200).send(result);    
    } catch (error) {
        next (error)
    }
}

module.exports.getAllIngredients = async (req, res, next) => {
    try {
        const result = await Ingredient.find({});
        return res.status(200).send(result);    
    } catch (error) {
        next (error)
    }
}