const express = require('express')
const CategoryController = require('../controllers/categoryController')


const router = express.Router();


router.post('/create', CategoryController.createCategory)
router.get('/getAllCategories', CategoryController.getAllCategories)
// router.get('/getCategoryByID/:id', CategoryController.getCategoryByID)
// router.put('/updateCategory/:id', CategoryController.updateCategory)
// router.delete('/deleteCategory/:id', CategoryController.deleteCategory)


module.exports = router;