const { Router } = require('express');
const SaladController = require('../controllers/salad.controller');
const { findIngredient } = require('../middlewares/getIngredients');
const { createImages } = require('../middlewares/createImages');
const path = require('path');
const multer = require('multer');
const {STATIC_PATH} = require('../configs/path.config');

// const upload = multer({ dest: path.resolve(__dirname, '../public/images')});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
})
  
const upload = multer({ storage })

const saladRouter = Router();

saladRouter.get('/', SaladController.getAllSalads);
saladRouter.post('/', findIngredient, upload.array('images'), createImages, SaladController.createSalad);
saladRouter.get('/:saladId', SaladController.getSalad);
saladRouter.put('/:saladId', findIngredient, upload.array('images'), createImages, SaladController.updateSalad);
saladRouter.delete('/:saladId', SaladController.deleteSalad);

module.exports = saladRouter;