const {User, validateUser} = require('../../model/User')
const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js')
var _ = require('lodash');
const Joi = require('joi')
   
const UserController = {
  async createUser(req,res){
    try{
      const {error} = validateUser(req.body);   //validate the using joi 
      if(error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({email:req.body.email});
      if (user) return res.status(400).send("user already exist");
      user = new User(_.pick(req.body,['username','email','password']));  //register new user 
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
      await user.save()
      return res.status(200).send(user)
    }catch(err){return res.status(400).json(err)}
  },
  
  async getUsers(req, res){
    try{
      const users = await User.find().select('-password')
      return res.status(200).json(users)
    }catch(err){return res.status(400).json(err)}
  },
  async getUserById(req,res){
    const {user_id} = req.params
    try{
      const user = await User.findById(user_id).select('-password')
      return res.status(200).send(user)
    }catch(err){return res.status(400).json(err)}
  },
  async deleteUserById(req,res){
  const {user_id} =  req.params
    try{
      const user = await User.findByIdAndDelete(user_id)
      return res.status(200).send(user)
    }catch(err){return res.status(400).json(err)}
  }
}

module.exports = UserController