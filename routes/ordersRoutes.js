const express = require('express');
const router = express.Router();

const {placeOrder} = require('../controllers/ordersController')

router.post('/placeOrder', placeOrder)


module.exports = router;