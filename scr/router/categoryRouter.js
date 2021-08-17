const express = require("express");
const router = express.Router();

const { requireSignIn } = require('../middleware/index');
const { createCategory, getCategory } = require("../controller/categoryController");

router.get("/getCategory", getCategory);
router.post("/createCategory", requireSignIn, createCategory);

module.exports = router;