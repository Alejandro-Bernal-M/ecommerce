const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = async(req, res) => {

  // res.json({file: req.files, body: req.body})
  const {
    name, price, description, category, quantity
  } = req.body;

  let productImages = [];

  if(req.files.length > 0){
   productImages =  req.files.map(file => ({img: file.filename}))
  }
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productImages,
    category,
    createdBy: req.user._id,
    quantity
  })

  try {
    const savedProduct = await product.save();
    if(savedProduct == product){
      res.status(200).json({savedProduct});
    }else {
      res.status(400).json({message: 'error saving product'})
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'something went wrong', error: error})
  }
}