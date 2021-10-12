const User = require('../../model/User')
const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js')
var _ = require('lodash');
const Joi = require('joi')

const LoginController = {
  async loginUser(req, res){
  const {error} = validateLogin(req.body);//validate the using joi 
  if(error) return res.status(400).send(error.details[0].message);
  const email = req.body.email
  try{
    const user = await User.findOne({email:req.body.email});
    if(user == null)return res.status(400).send('cannot find user')
    if(await bcrypt.compare(req.body.password, user.password))
      {
        return res.status(200).json("Welcome " + "" + email)
      }else{
        res.status(400).send("failed to login")
       }
    }
    catch(err){
      return res.status(400).json(err)
    }
  }
  
}

function validateLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema)
}


module.exports = LoginController