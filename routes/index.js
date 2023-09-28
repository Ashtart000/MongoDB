const { Router } = require('express');
const saladRouter = require('./salad');
const ingrRouter = require('./ingredients');

const router = Router();

router.use('/salads', saladRouter);
router.use('/ingredients', ingrRouter);

module.exports = router;