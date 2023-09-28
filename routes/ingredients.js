const { Router } = require('express');
const IngrController = require('../controllers/ingr.controller');

const ingrRouter = Router();

ingrRouter.get('/', IngrController.getAllIngredients);
ingrRouter.post('/', IngrController.createIngredient);
// ingrRouter.get();
// ingrRouter.put();
// ingrRouter.delete();

module.exports = ingrRouter;