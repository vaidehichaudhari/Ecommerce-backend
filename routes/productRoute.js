const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/create', ProductController.createProduct);

// Get all products
router.get('/getAllProducts', ProductController.getAllProducts);

// Get product by ID
router.get('/getProductByID/:id', ProductController.getProductByID);

// Update a product by ID
router.put('/updateProduct/:id', ProductController.updateProduct);

// Delete a product by ID
router.delete('/deleteProduct/:id', ProductController.deleteProduct);

module.exports = router;
