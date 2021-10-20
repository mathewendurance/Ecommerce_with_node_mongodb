const Cart = require('../../model/Cart')
const CartController = {

async AddToCart(req,res){
  const bodyData = req.body
  const {user_id} = req.params
  try{
    const createdCart =await Cart.create({...bodyData, username: user_id})
    await createdCart.populate( 'products' )
  return res.status(200).send(createdCart)
  }
  catch(err){
    return res.status(400).json(err)
  }
},

async getUserCarts(req,res){
  const {user_id} = req.params
  const {cart_id} = req.params
    try{
      const userCarts = await Cart.find({username: user_id, cart:cart_id}).populate('products').populate('username')
      return res.status(200).json(userCarts)
 }catch(err){
    return res.status(400).json(err)
  }
},

async getCart(req,res){
    const {cart_id} = req.params
    try{
      const cart = await Cart.findById(cart_id)
      //const cart = await cart.find({cart: cart_id}).populate('products')
      return res.status(200).json(cart)
  }catch(err){
    return res.status(400).json(err)
  }
}
}

module.exports = CartController; 