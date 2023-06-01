const express = require('express');
const router = express.Router();

const {placeOrder, usersAllOrder, designersAllOrder} = require('../controllers/ordersController')

router.post('/placeOrder', placeOrder)
router.get('/usersAllOrder', usersAllOrder)
router.get('/designersAllOrders', designersAllOrder)

module.exports = router;