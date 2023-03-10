const userController = require('../controllers/userController');

const express = require('express');

const router = express.Router();

router.post('/signup', userController.signupUser);

router.post('/login', userController.loginUser);

module.exports = router;