const mongoose = require('mongoose');
const Joi = require('joi');
const schema = new mongoose.Schema({
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
})
module.exports = mongoose.model('User', schema)