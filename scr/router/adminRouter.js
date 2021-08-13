const express = require("express");
const router = express.Router();
const {Signup, Signin, createPost, createCategory, 
  getCategory, getPosts, getPost, deletePost, updatePost} = require("../controller/adminController");
const {isValidateSignUp, isValidateSignIn} = require('../validator/validate');
const { requireSignIn } = require('../middleware/index');
const multer = require('multer');   
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/images'))
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})   
const upload = multer({ storage: storage });


router.post("/signup", isValidateSignUp, Signup);
router.post("/signin", isValidateSignIn, Signin);
router.post("/createPost", requireSignIn, upload.single('thumbnail'), createPost);
router.post("/createCategory", requireSignIn, createCategory);
router.get("/getCategory", getCategory);
router.get("/getPosts", getPosts);
router.get("/getPost/:id", getPost);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);
module.exports = router;