const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js');
const { signup, login } = require('../Controllers/AuthController.js');

const router = express.Router();


router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login)

module.exports = router;