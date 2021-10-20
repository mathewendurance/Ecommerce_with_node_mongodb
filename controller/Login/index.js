const {User, validate} = require('../../model/User');
//const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js');
var _ = require('lodash');
const Joi = require('joi');

const LoginController = {
  async loginUser(req, res){
  const {error} = validate(req.body);//validate the using joi 
  if(error) return res.status(400).send(error.details[0].message);
  
  const email = req.body.email
  try{
    const user = await User.findOne({email:req.body.email});
    if(user == null)return res.status(400).send('cannot find user')
    if(await bcrypt.compare(req.body.password, user.password)){
        const token = user.generateAuthToken()
        res.header('x-auth-token', token).json("Welcome " + "" + email)
      }else{
        res.status(400).send("failed to login")
      }
  }catch(err){
      return res.status(400).json(err)
    }
  }
}
module.exports = LoginController