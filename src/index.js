const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const routes = require('./routes')
const app = express();


mongoose.connect('mongodb://localhost/new_ecommerce',{
  useUnifiedTopology:true,
  useNewUrlParser: true})
  
    .then(()=>console.log('connected to DB'))
    .catch(err => console.log('error connecting', err))



  app.use(cors())
  app.use(express.json())
  app.use(routes)

app.listen(3333, ()=>console.log('server running'))

