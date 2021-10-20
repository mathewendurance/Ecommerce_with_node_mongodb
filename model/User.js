const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required:true,
    minlength:5,
    maxlength:30
  },
  email:{
    type: String,
    required:true,
    minlength:5,
    maxlength:255,
    unique:true
  },
  password:{
    type: String,
    required:true,
    minlength:5,
    maxlength:1024
  }
});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id, isUnique: this.isUnique}, config.get('jwtPrivateKey'))
  return token
}
const User = mongoose.model('User', userSchema);

function validateLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema)
}
  
function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema)
}

exports.validate = validateLogin;
exports.User = User; 
exports.validateUser = validateUser; 
