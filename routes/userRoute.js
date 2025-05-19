const express = require('express')
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.registerUser)
router.post('/login', userController.LoginUser)
router.get('/getUserInfo',userController.getUserInfo)


module.exports = router