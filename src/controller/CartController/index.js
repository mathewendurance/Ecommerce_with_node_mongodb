const Cart = require('../../model/Cart')
const CartController = {

async createCart(req,res){
  const bodyData = req.body
  const {user_id} = req.params
  try{
    const createdCart =await Cart.create({...bodyData,username: user_id})
    return res.status(200).send(createdCart)
  }catch(err){
    return res.status(400).json(err)
  }
},

async getUserCarts(req,res){
    try{

  }catch(err){
    return res.status(400).json(err)
  }
},

async getCart(req,res){
    try{

  }catch(err){
    return res.status(400).json(err)
  }
}
}

module.exports = CartController;