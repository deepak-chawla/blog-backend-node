const express = require("express");
const router = express.Router();
const { Signup, Signin } = require("../controller/authController");
const { isValidateSignUp, isValidateSignIn } = require('../validator/validate');

router.post("/signup", isValidateSignUp, Signup);
router.post("/signin", isValidateSignIn, Signin);

module.exports = router;