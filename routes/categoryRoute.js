const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.post('/create', categoryController.createCategory);
router.get('/getAllCategories', categoryController.getAllCategories);
router.get('/getCategoryByID/:id', categoryController.getCategoryByID);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;
