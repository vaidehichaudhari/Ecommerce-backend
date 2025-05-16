const express = require('express')
const brandController = require('../controllers/brandController')


const router = express.Router();


router.post('/create', brandController.createBrand)
router.get('/getAllBrands', brandController.getAllBrands)
// router.get('/getBrandByID/:id', brandController.getBrandByID)
// router.put('/updateBrand/:id', brandController.updateBrand)
// router.delete('/deleteBrand/:id', brandController.deleteBrand)


module.exports = router;