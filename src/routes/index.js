const {Router} = require('express')
const Joi = require('joi')
const UserController = require('../controller/UserController')
const LoginController = require('../controller/Login')
const ProductController = require('../controller/ProductController')
const CartController = require('../controller/CartController')
const routes = Router()
 
routes.get('/',(req, res)=>{
    res.send('hellow')
})
routes.post('/users', UserController.createUser)
//routes.post('/users/login', UserController.loginUser)
routes.get('/users', UserController.getUsers)
routes.get('/users/:user_id', UserController.getUserById)
routes.delete('/users/:user_id',UserController.deleteUserById)

routes.post('/login', LoginController.loginUser)

routes.post('/products/:user_id',ProductController.createProduct)
routes.get('/:user_id/products', ProductController.getUserProduct)
routes.patch('/products/:user_id/:product_id', ProductController.updateProduct)
routes.delete('/products/:user_id/:product_id', ProductController.deleteProduct)

routes.get('/products', ProductController.getProduct)
routes.get('/products/:product_id', ProductController.getProductById)

routes.post('/carts/:user_id', CartController.createCart)
routes.get('/carts/:user_id', CartController.getUserCarts)
routes.get('/carts/:cart_id', CartController.getCart)


module.exports = routes