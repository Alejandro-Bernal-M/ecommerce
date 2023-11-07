const Cart = require('../models/cart');

exports.addItemToCart = async(req, res) => {
  const existedCart = await Cart.findOne({user: req.user._id});

  if(existedCart){
    const product = req.body.cartItems.product;
    const item = existedCart.cartItems.find(item => item.product == product );

    if(item){
      try {
        const updatedCart = await Cart.findOneAndUpdate(
          {user: req.user._id, "cartItems.product": product}, 
          {
            "$set":{
              "cartItems":{
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
                price: item.price + req.body.cartItems.price
              }
            }
          },
          {returnDocument: 'after'}
        );
        if(updatedCart){
          return res.json({updatedCart});
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({error: error, message: 'Error saving the item'})
      }
    }else{
      try {
        const updatedCart = await Cart.findOneAndUpdate(
          {user: req.user._id}, 
          {
            "$push":{
              "cartItems": req.body.cartItems
            }
          },
          {returnDocument: 'after'}
        );
        if(updatedCart){
          return res.json({updatedCart});
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({error: error, message: 'Error saving the item'})
      }
    }

  }else {
    const cart = new Cart({
      user: req.user._id,
      cartItems: [req.body.cartItems]
    });
  
    try {
      const savedCart = await cart.save();
      if(savedCart == cart){
        return res.status(200).json({savedCart});
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({error: error, message: 'Error saving the item'})
    }
  }
};