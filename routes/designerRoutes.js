const express = require('express');
const router = express.Router();
const { registerDesigner, loginDesigner, createShop, allProduct, addProductToShop } =  require('../controllers/designersController')


router.post('/registerDesigner', registerDesigner)
router.post('/addProductToShop', addProductToShop)
router.put('/createShop/:id', createShop)
router.post('/loginDesigner', loginDesigner)
router.get('/allProduct', allProduct)


module.exports = router;