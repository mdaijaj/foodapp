// const multer  = require('multer');
// const path=require('path')
// const fs=require('fs')
const express= require('express')
const router=express()

const user= require('../controller/user_controller') 
const rest= require('../controller/rest_controller')
const order= require('../controller/order_controller')
const foodService= require('../controller/food_servie')
const {authenticate}= require('../middleware/index')
const {login_required}= require('../middleware/index')


// middleware
router.use(express.static(__dirname + '/public'));
// router.use('/uploads', express.static('uploads'));
// const upload = multer({ dest: 'uploads/' })


//routes for resutarant crude admin
router.post('/addrest', rest.addRests)
router.get('/allrests', rest.allRests)
router.get('/restdetails/:id', rest.restDetails)


router.get('/cartlist', rest.cartList)
router.put('/updatetocart/:id', rest.updateToCart)
router.put('/removetocart/:id', rest.removeToCart)

// router.put('/updatehotel/:id',login_required, rest.updateHotel)
// router.delete('/deletehotel/:id', login_required, rest.deleteHotel)

//search resutarant
router.get('/searchrest', rest.searcRest)
// router.post('/restaurantsearch', rest.restaurantSearch)



//users routes
router.post('/signup', user.signup);
router.post('/login', user.login)
router.get('/logout', login_required, user.logout)
router.get('/allUsers', user.allUsers)
router.put('/updateuser/:id', login_required, user.updateUser)
router.get('/userdetails/:id', login_required, user.userDetails)


// routes for foodservice crude
router.post('/createservice', foodService.addService)
router.get('/allservices', foodService.allServices)
router.get('/servicedetails/:id', foodService.serviceDetails)
router.put('/updateservice/:id', foodService.updateService)
router.delete('/deleteservice/:id', foodService.deleteService)



// routes for Order crude
router.post('/neworder', order.newOrder)
router.get('/allorder', order.allOrders)
router.get('/singleOrder/:id', order.singleOrder)
router.put('/updateservice/:id', order.orderUpdate)
router.delete('/deleteservice/:id', order.deleteOrder)
router.get('/myorder', order.myOrder)


module.exports = router;