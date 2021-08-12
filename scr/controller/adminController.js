const Admin = require('../model/admin');
const Post = require('../model/post');
const Category = require('../model/category');
const jwt = require('jsonwebtoken');


const generateJwtToken = (_id, email)=>{
    return jwt.sign({_id, email}, process.env.JWT_KEY,{expiresIn: '1h'});
}

exports.Signup = (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    const _admin = new Admin({
        firstName,
        lastName,
        email,
        password
    });

    _admin.save((error,admin)=>{
        if(error){
            return res.status(400).json({messege: "Something went wrong"});
        }
        if (admin) {
            const token = generateJwtToken(admin._id, admin.email);
            return res.status(201).json({token});
          }
    }
    );
}

exports.Signin = (req, res)=>{
    Admin.findOne({ email: req.body.email }).exec(
        (error,admin)=>{
            if(error)
            return res.status(404).json({error});
            if (admin)
            {
                 if(admin.password == req.body.password){
                     const token = generateJwtToken(admin._id, admin.email);
                     return res.status(200).json({token});
                 }
                 else { return res.status(200).json({messege: 'incorrect password'}); }
            }
            else { return res.status(200).json({messege: 'user not found'}); }
        }
    );
}

exports.createPost = (req, res)=>{
    const {title, text, category} = req.body;
    const createdBy = req.user._id;
    const thumbnail = req.file.path;

    const _newPost = new Post({
        title,
        text,
        category,
        createdBy,
        thumbnail
    });

    _newPost.save((err, post)=>{
        if(post)
        return res.status(201).json({post});
    });

}

exports.getPost = (req, res) => {
  Post.find().exec((error, posts) => {
    if (error) return res.status(400).json({ error });
    if (posts) {
      const POSTS = [];
      for (let post of posts) {
        POSTS.push({
          _id: post._id,
          title: post.title,
          text: post.text,
          thumbnail: post.thumbnail,
          createdBy: post.createdBy,
          date: post.date,
          category: post.category
        });
      }
      return res.status(200).json({POSTS});
    }
  });
};


function getCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        type: cate.type,
        children: getCategories(categories, cate._id),
      });
    }
  
    return categoryList;
}

exports.createCategory = (req, res) => {
  Category.findOne({name: req.body.name})
  .exec((err,cate)=>{
    if(err)
    return res.status(400).json(err);
    if(cate)
    return res.status(400).json({messese:"Category already exist."});
    else{
      const {name, parentId} = req.body;
      const _newCate = new Category({
        name,
        parentId
      });

      _newCate.save((err,cat)=>{
        if(err)
        return res.status(400).json({err});
        if(cat)
        return res.status(400).json({cat});
      });
    }
  })
}

  exports.getCategory = (req, res) => {
    Category.find().exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        const categoryList = getCategories(categories);
        res.status(200).json({ categoryList });
      }
    });
  };