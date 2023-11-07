const Category = require('../models/category');
const slugify = require('slugify');


function createCategories(categories, parentId = null){
  let categoryList = [];
  let category;

  if(parentId == null){
    category = categories.filter(cat => cat.parentId == undefined);
  }else {
    category = categories.filter(cat => cat.parentId == parentId);
  }

  category.forEach(cat => {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id)
    })
  })

  return categoryList;
}

exports.createCategory = async(req, res) => {
  
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name)
  };

  if(req.file){
    categoryObj.categoryImage = process.env.API +'/public/' + req.file.filename;
  }

  if(req.body.parentId){
    categoryObj.parentId = req.body.parentId
  }

  const newCategory = new Category(categoryObj)

  try {
    const savedCategory = await newCategory.save();
    if(savedCategory == newCategory){
      res.status(200).json({savedCategory});
    }else {
      res.status(400).json({message: 'error saving category'})
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'something went wrong', error: error})
  }

};

exports.getCategories = async(req, res) => {
  try {
    const categories = await Category.find({});
    if(categories){
      let categoryList = createCategories(categories)
      res.json({categoryList})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'Error fetching categories', error: error})
  }
}