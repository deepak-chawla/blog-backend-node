const Category = require('../model/category');

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