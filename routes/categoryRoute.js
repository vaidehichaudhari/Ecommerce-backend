const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth')


router.post('/create',authMiddleware.auth, categoryController.createCategory);
router.get('/getAllCategories', categoryController.getAllCategories);
router.get('/getCategoryByID/:id', categoryController.getCategoryByID);
router.put('/updateCategory/:id',authMiddleware.auth, categoryController.updateCategory);
router.delete('/deleteCategory/:id',authMiddleware.auth, categoryController.deleteCategory);

module.exports = router;