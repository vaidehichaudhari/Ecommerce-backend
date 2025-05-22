const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth')

router.post('/create', authMiddleware.auth,productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductByID/:id', productController.getProductByID);
router.put('/updateProduct/:id', authMiddleware.auth,productController.updateProduct);
router.delete('/deleteProduct/:id', authMiddleware.auth,productController.deleteProduct);
router.get('/byCategory/:categoryId', productController.getProductsByCategory);
router.get('/byBrand/:brandId', productController.getProductsByBrand);

module.exports = router;
