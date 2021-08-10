const express = require("express");
const router = express.Router();
const {Signup , Signin} = require("../controller/adminController");

router.post("/signup",Signup);

module.exports = router;