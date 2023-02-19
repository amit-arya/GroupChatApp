const userController = require('../controllers/userController');

const express = require('express');

const router = express.Router();

router.post('/signup', userController.signupuser);

module.exports = router;