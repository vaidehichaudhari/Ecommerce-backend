const express = require('express')
const categoryController = require('../controllers/categoryController')


const router = express.Router();


router.post('/create', categoryController.createCategory)
router.get('/getAllCategories', categoryController.getAllCategories)
// router.get('/getCategoryByID/:id', CategoryController.getCategoryByID)
// router.put('/updateCategory/:id', CategoryController.updateCategory)
// router.delete('/deleteCategory/:id', CategoryController.deleteCategory)


module.exports = router;