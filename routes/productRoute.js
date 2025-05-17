const express = require('express')
const productController = require('../controllers/productController')


const router = express.Router();


router.post('/create', productController.createProduct)
router.get('/getAllProducts', productController.getAllProducts)
// router.get('/getProductByID/:id', productController.getProductByID)
//router.put('/updateProduct/:id', productController.updateProduct)
// router.delete('/deleteProduct/:id', productController.deleteProduct)


module.exports = router;