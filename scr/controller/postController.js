const Post = require('../model/post');

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
      if(err)
        return res.status(400).json({err});
      if(post)
        return res.status(201).json("Post has been created.");
    });
}

exports.getPosts = (req, res) => {
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
      return res.status(200).json(POSTS);
    }
  });
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
  .exec((err,post)=>{
    if(err)
    res.status(400).json(err);
    if(post)
    res.status(200).json(post);
  })
}

exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id,{
    $set: req.body },{new: true},
  (err, updatedpost)=>{
    if (err)
      return res.status(400).json(err);
    if(updatedpost)
      return res.status(201).json(updatedpost);
  });
}

exports.deletePost = (req, res) => {
  Post.findById(req.params.id)
  .exec((err,post)=>{
    if(err)
    res.status(400).json({err});
    if(post){
      post.delete();
      res.status(200).json("your post successfully deleted.");
    }
    })
}
