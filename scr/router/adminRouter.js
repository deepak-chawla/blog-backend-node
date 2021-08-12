const express = require("express");
const router = express.Router();
const {Signup, Signin, createPost, createCategory, getCategory} = require("../controller/adminController");
const {isValidateSignUp, isValidateSignIn} = require('../validator/validate');
const { requireSignIn } = require('../middleware/index');

router.post("/signup", isValidateSignUp, Signup);
router.post("/signin", isValidateSignIn, Signin);
router.post("/createPost", requireSignIn, createPost);
router.post("/createCategory", requireSignIn, createCategory);
router.get("/getCategory", getCategory);


module.exports = router;