const express = require('express');
const { registerValidate } = require('../validation/registerSchema.js');
const { validate } = require('../middleware/validate.js');
const { loginValidate } = require('../validation/loginSchema.js');
const auth = require('../middleware/authentication.js');
const limiter = require('../middleware/rateLimitter.js');

// Importing authController
const {
    registration, login, refresh, logout
} = require('../controller/authController.js');

const router = express.Router();

// ENDPOINT API

// Auth
router.post('/login', validate(loginValidate), login);

// Registration
router.post('/register', limiter, validate(registerValidate), registration);

// Logout
router.post('/logout', auth, limiter, logout); 

// Refresh Token
router.post('/refresh', limiter, refresh);

module.exports = router;