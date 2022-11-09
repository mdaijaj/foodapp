// const multer  = require('multer');
// const path=require('path')
// const fs=require('fs')
require('dotenv').config();
const express= require('express')
const router=express()
const {v4: uuidv4}= require('uuid')
const user= require('../controller/user_controller') 
const rest= require('../controller/rest_controller')
const order= require('../controller/order_controller')
const foodService= require('../controller/food_servie')
const {authenticate}= require('../middleware/index')
const {login_required}= require('../middleware/index')
const paypalController = require('../controller/payment_method_controller');
const PaytmChecksum = require('../paytm/PaytmChecksum')

// Middleware for body parsing
const parseUrl = express.urlencoded({ extended: false })
const parseJson = express.json({ extended: false })

const checksum_lib = require('../paytm/checksum')
// const config = require('./Paytm/config')

// middleware
router.use(express.static(__dirname + '/public'));
// router.use('/uploads', express.static('uploads'));
// const upload = multer({ dest: 'uploads/' })


//routes for resutarant crude admin
router.post('/addrest', rest.addRests)
router.get('/allrests', rest.allRests)
router.get('/restdetails/:id', rest.restDetails)
router.post('/findrestaurant', rest.restaurantSearch)


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

// // gateway of payment:-
// router.get('/paytm', (req, res) => {
//     res.sendFile(path.join(__dirname + '/views/index.html'))
// })

// router.post('/payment', (req, res)=>{
//     const{amount,email}=req.body;
//     const totalAmount=JSON.stringify(amount);

//     /* import checksum generation utility */
//     // var PaytmChecksum = require("./PaytmChecksum");

//     var params = {};

//     /* initialize an array */
//     /* initialize an array */
    // params['MID'] = process.env.PAYTM_MID,
    // params['WEBSITE'] = process.env.PAYTM_WEBSITE,
    // params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
    // params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
    // params['ORDER_ID'] = uuidv4(),
    // params['MARCHAND_KEY'] = process.env.MARCHAND_KEY,
    // params['TXN_AMOUNT'] = 500,
    // params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
    // params['EMAIL'] = "aijaj@gmail.com",
    // params['MOBILE_NO'] = '8826616653'

//     /**
//     * Generate checksum by parameters we have
//     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
//     */
//     var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.MARCHAND_KEY );
//     paytmChecksum.then(function(checksum){
//         console.log("checksum", checksum)
//         let paytmParams={
//             ...params,
//             "CHECKSUMHASH": checksum,

//         }
//         console.log("generateSignature Returns: " + paytmParams);
//         res.json(paytmParams)
//     }).catch(function(error){
//         console.log(error);
//     });
// })

//callback payment
// router.post('/callback', (req,res)=>{
//     const form=new formidable.IncomingForm();
//     form.parse(req,(err,fields,file)=>{
//         paytmChecksum = fields.CHECKSUMHASH;
//         delete fields.CHECKSUMHASH;
        
//         var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
//         if (isVerifySignature) {
//             var paytmParams = {};
//             paytmParams["MID"]     = fields.MID;
//             paytmParams["ORDERID"] = fields.ORDERID;

//             PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY).then(function(checksum){
//                 paytmParams["CHECKSUMHASH"] = checksum;
//                 var post_data = JSON.stringify(paytmParams);

//                 var options = {
        
//                     /* for Staging */
//                     hostname: 'securegw-stage.paytm.in',
            
//                     /* for Production */
//                     // hostname: 'securegw.paytm.in',
            
//                     port: 443,
//                     path: '/order/status',
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': post_data.length
//                     }
//                 };

//                 var response = "";
//                 var post_req = https.request(options, function(post_res) {
//                     post_res.on('data', function (chunk) {
//                         response += chunk;
//                     });
            
//                     post_res.on('end', function(){
//                         let result=JSON.parse(response)
//                         if(result.STATUS==='TXN_SUCCESS'){
//                             //store in db
//                             db.collection('payments').doc('mPDd5z0pNiInbSIIotfj').update({paymentHistory:firebase.firestore.FieldValue.arrayUnion(result)})
//                             .then(()=>console.log("Update success"))
//                             .catch(()=>console.log("Unable to update"))
//                         }
//                         res.redirect(`http://localhost:3000/status/${result.ORDERID}`)
//                     });
//                 });
            
//                 post_req.write(post_data);
//                 post_req.end();
//             })

//         }else{
//             console.log("Checksum Mismatched");
//         }
//     })
// })

router.post('/paynow', (req, res) => {
    console.log("api is working...")
    var paymentDetails = {
              amount: req.body.amount,
              customerId: req.body.name,
              customerEmail: req.body.email,
              customerPhone: req.body.phone
          }
        //   if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
        //       res.status(400).send('Payment failed')
        //   } else {
        //         var params = {};
        //         params['MID'] = process.env.PAYTM_MID,
        //         params['WEBSITE'] = process.env.PAYTM_WEBSITE,
        //         params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
        //         params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
        //         params['ORDER_ID'] = uuidv4(),
        //         params['MARCHAND_KEY'] = process.env.MARCHAND_KEY,
        //         params['TXN_AMOUNT'] = 500,
        //         params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
        //         params['EMAIL'] = "aijaj@gmail.com",
        //         params['MOBILE_NO'] = '8826616653'
  
                var params = {};
                params['MID'] = process.env.PAYTM_MID,
                params['WEBSITE'] = process.env.PAYTM_WEBSITE,
                params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
                params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
                params['ORDER_ID'] = uuidv4(),
                params['MARCHAND_KEY'] = process.env.MARCHAND_KEY,
                params['TXN_AMOUNT'] = 500,
                params['CALLBACK_URL'] = 'http://apiresortweb.tk/api/callback',
                params['EMAIL'] = "aijaj@gmail.com",
                params['MOBILE_NO'] = '8826616653'
                
              checksum_lib.genchecksum(params, process.env.MARCHAND_KEY, function (err, checksum) {
                if(err){
                    console.log(err.message, "king")
                }
                console.log("checksum", checksum)
                  var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
                  // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
  
                  var form_fields = "";
                  for (var x in params) {
                      form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
                  }
                  form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
  
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
                  res.end();
              });
        //   }
  })
  
  router.post('/callback', [parseUrl, parseJson], (req, res) => {
    var body = '';
  
    req.on('data', function (data) {
       body += data;
    });
  
     req.on('end', function () {
       var html = "";
       var post_data = qs.parse(body);
  
       // received params in callback
       console.log('Callback Response: ', post_data, "\n");
  
  
       // verify the checksum
       var checksumhash = post_data.CHECKSUMHASH;
       // delete post_data.CHECKSUMHASH;
       var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
       console.log("Checksum Result => ", result, "\n");
  
  
       // Send Server-to-Server request to verify Order Status
       var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};
  
       checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
  
         params.CHECKSUMHASH = checksum;
         post_data = 'JsonData='+JSON.stringify(params);
  
         var options = {
           hostname: 'securegw-stage.paytm.in', // for staging
           // hostname: 'securegw.paytm.in', // for production
           port: 443,
           path: '/merchant-status/getTxnStatus',
           method: 'POST',
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
             'Content-Length': post_data.length
           }
         };
  
  
         // Set up the request
         var response = "";
         var post_req = https.request(options, function(post_res) {
           post_res.on('data', function (chunk) {
             response += chunk;
           });
  
           post_res.on('end', function(){
             console.log('S2S Response: ', response, "\n");
  
             var _result = JSON.parse(response);
               if(_result.STATUS == 'TXN_SUCCESS') {
                   res.send('payment sucess')
               }else {
                   res.send('payment failed')
               }  
             });
         });
  
         // post the data
         post_req.write(post_data);
         post_req.end();
        });
       });
  })





//   /**
//    * @apiGroup Payment
//    * @apiVersion 1.0.0
//    * @api {get} /v1/payment/paypal/callback  Paypal callback return url
//    * @apiDescription update transaction base on request
//    * @apiPermission all
//    */
//   router.get('/v1/payment/paypal/callback',
//     paypalController.callback,
//     // Middleware.Response.success('callback')
//   );

//   router.post('/v1/payment/paypal/callbackCCAvenue',
//     paypalController.callbackCCAvenue,
//     // Middleware.Response.success('callback')
//   );


//   /**
//    * @apiGroup Payment
//    * @apiVersion 1.0.0
//    * @api {post} /v1/payment/paypal/hook  Paypal webhook
//    * @apiDescription Paypal webhook for sale completed event
//    * @apiPermission all
//    */
//   router.post('/v1/payment/paypal/hook',
//     paypalController.hook,
//     // Middleware.Response.success('hook')
//   );



module.exports = router;