const express = require('express')
const brandController = require('../controllers/brandController')
const authMiddleware = require('../middleware/auth')

const router = express.Router();


router.post('/create',authMiddleware.auth, brandController.createBrand)
router.get('/getAllBrands', brandController.getAllBrands)
router.get('/getBrandByID/:id', brandController.getBrandByID)
router.put('/updateBrand/:id',authMiddleware.auth, brandController.updateBrand)
router.delete('/deleteBrand/:id', authMiddleware.auth,brandController.deleteBrand)


module.exports = router;