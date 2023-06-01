const express = require('express');
const router = express.Router();

const {placeOrder, usersAllOrder} = require('../controllers/ordersController')

router.post('/placeOrder', placeOrder)
router.get('/usersAllOrder', usersAllOrder)

module.exports = router;