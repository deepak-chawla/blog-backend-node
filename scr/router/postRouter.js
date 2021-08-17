const express = require("express");
const router = express.Router();

const { requireSignIn } = require('../middleware/index');
const { createPost, getPosts, getPost, deletePost, updatePost } = require("../controller/postController");
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


router.post("/createPost", requireSignIn, upload.single('thumbnail'), createPost);
router.get("/getPosts", getPosts);
router.get("/getPost/:id", getPost);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);


module.exports = router;