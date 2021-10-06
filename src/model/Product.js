const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  productDescription:{
    type:String
  },
  productPrice:{
    type:Number,
    requires:true
  },
  productQuantity:{
    type:Number,
    required:true
  },
  productImage:{
    type:String
  },
  username:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  }
})
module.exports = mongoose.model('Product', schema)