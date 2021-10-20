const {Router} = require('express')
const Joi = require('joi')
const auth = require('../middleware/auth');
const unique = require('../middleware/unique');
const config = require('config')
const UserController = require('../controller/UserController')
const LoginController = require('../controller/Login')
const ProductController = require('../controller/ProductController')
const CartController = require('../controller/CartController')
const routes = Router()

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: JWT not defined');
    process.exit(1); 
}
 
routes.get('/',(req, res)=>{
    res.send('hellow')
})
routes.post('/users', UserController.createUser)
routes.get('/users', UserController.getUsers)
routes.get('/users/:user_id', UserController.getUserById)
routes.delete('/users/:user_id', auth,UserController.deleteUserById)

routes.post('/login', LoginController.loginUser)

routes.post('/products/:user_id',ProductController.createProduct)
routes.get('/:user_id/products', ProductController.getUserProduct)
routes.patch('/products/:user_id/:product_id', ProductController.updateProduct)
routes.delete('/products/:user_id/:product_id',auth, ProductController.deleteProduct)

routes.get('/products', ProductController.getProduct)
routes.get('/products/:product_id', ProductController.getProductById)

routes.post('/carts/:user_id', auth, CartController.AddToCart)
routes.get('/:user_id/:cart_id', auth, CartController.getUserCarts)
routes.get('/carts/:cart_id', auth, CartController.getCart)




module.exports = routes