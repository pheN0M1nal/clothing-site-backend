const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, getProductById, updateProduct, 
        getProductsByDesignerID, getProductByCategory, getAllProducts, 
        placeRating } =  require('../controllers/productsController')


router.post('/createProduct', createProduct)
router.get('/getProductByID/:id', getProductById)
router.delete('/deleteProductByID/:id', deleteProduct)
router.put('/updateProduct/:id', updateProduct)
router.get('/getProductsByDesignerID/:id', getProductsByDesignerID)
router.get('/getProductByCategory/:category', getProductByCategory)
router.get('/getAllProducts', getAllProducts)
router.put('/placeRating/:id/:rating', placeRating)

module.exports = router;