// const _ = require('lodash');
// // const SMS = require('../../notification/services/Sms-krepl');
// var http = require('http'),
// fs = require('fs'),
// ccav = require('../components/ccavutil.js'),
// qs = require('querystring');
// const mongoose = require('mongoose');
// var order = require("../../order/services/order")
// const nconf = require('nconf');
// // const goFrugalOrderUpdateURL = nconf.get('GOFRUGAL_UpdateURL');
// // const goFrugalApiKey = nconf.get('GOFRUGAL_API_KEY');
// const axios = require("axios");

  
//    exports.callbackCCAvenue = async (req, res, next) => {
//     try 
//     {
//     var ccavEncResponse = req.body.encResp,
//     ccavResponse='',	
//     orderNo = req.body.orderNo,
//     workingKey = process.env.CC_KEY,	//Put in the 32-Bit key shared by CCAvenues.
    
//     ccavResponse = ccav.decrypt(ccavEncResponse,workingKey);
    
    

//     var respArr = ccavResponse.split("&");
//     console.log("aijaj: ",respArr);
//     let respArrCell = respArr.filter(s => s.includes("tracking_id"));
//     var tracking_id = respArrCell[0].split("=")[1];
//     let respArrCell1 = respArr.filter(s => s.includes("order_id"));
//     var order_id = respArrCell1[0].split("=")[1];
//     console.log(order_id,"order_id")
    
//     respArrCell = respArr.filter(s => s.includes("order_status"));
//     value = respArrCell[0].split("=")[1];
//     let order_status = value;

//     respArrCell = respArr.filter(s => s.includes("status_code"));
//     value = respArrCell[0].split("=")[1];
//     console.log("status_code: ", value);

//     respArrCell = respArr.filter(s => s.includes("bank_ref_no"));
//     var bank_ref_no  = respArrCell[0].split("=")[1];

//     respArrCell = respArr.filter(s => s.includes("merchant_param2"));
//     var order_id = mongoose.Types.ObjectId(respArrCell[0].split("=")[1]);

//     respArrCell = respArr.filter(s => s.includes("merchant_param3"));
//     var transaction_id  = mongoose.Types.ObjectId(respArrCell[0].split("=")[1]);

//     if (order_status !="Success"){
//         const transaction = await DB.Transaction.findOneAndUpdate({
//           _id: transaction_id
//         }, {
//           $set: {
//             status: 'pending',
//             paymentStatus: 'cancelled',
//             paymentId: tracking_id,
//             paymentToken: null //bank_ref_no
//           }
//         });
//         transaction.save()       
//         await Service.Order.updatePaid(order_id, transaction._id,order_status);
//         return res.redirect(process.env.userWebUrl + "/cart/checkout/cancel");
//     }else{    
//       const transaction = await DB.Transaction.findOneAndUpdate({
//         _id: transaction_id
//       }, {
//         $set: {
//           status: 'pending',
//           paymentStatus: 'completed',
//           paymentId: tracking_id,
//           paymentToken: bank_ref_no
//         }
//       })
//       const order1 = await Service.Order.updatePaid(order_id, transaction._id,order_status);
//       const invoiceData = transaction.toObject();
//       delete invoiceData._id;
//       const invoice = new DB.Invoice(invoiceData);
//       invoice.transactionId = transaction._id;
//       await invoice.save();
     
//       const prabind =respArr[0].split ("=")[1]
//       const order = await DB.Order.findOne({ trackingCode:prabind}).populate('details');
//      const orderDetails =await DB.OrderDetail.findOne({ orderId:order_id })
//     //  await SMS.smssend(phoneCheck);
//     //  console.log(sms,"sms")
//        var body = [orderDetails];

//        var orderlocal = order;
//        var rowNo = 1;
//        var salesOrder = {
//            orderItems: []
//        };
//        var finalData = {};
//        var totalTaxAmount = 0;
//        var totalDiscountAmount = 0;
//        var pItem = "";
//        try {
//            _.forEach(body, function (item, index) {
//                //_.forEach(element,  function (itemRow, index) {
//                var orderItem = {};
//                var splitString = [];
//                orderItem.rowNo = rowNo;
   
//                if (item.productVariantId != null) {
//                    pItem = item.variantDetails.options[0].optionKey;
//                    splitstring = pItem.split("-");
//                    orderItem.itemId = splitstring[0];
//                    orderItem.salePrice = item.variantDetails.salePrice;
   
//                    orderItem.itemMarketPrice = item.variantDetails.price;
//                }
//                else {
//                    orderItem.itemId = item.productDetails.mpn.split("-")[0];
//                    orderItem.salePrice = item.productDetails.salePrice;
//                    orderItem.itemMarketPrice = item.productDetails.price;
//                }
//                orderItem.itemReferenceCode = item.trackingCode;
//                orderItem.quantity = item.quantity;
   
//                //item.totalPrice (total price of item including tax)
//                //item.productPrice (price of item Excluding tax)
//                //item.taxPrice (is total tax of item)
//                orderItem.itemAmount = item.totalPrice;
   
//                totalTaxAmount = totalTaxAmount + item.taxPrice;
   
//                orderItem.taxPercentage = item.taxPercentage;
//                // orderItem.discountPercentage = (orderItem.itemMarketPrice - orderItem.salePrice) * 100 / orderItem.itemMarketPrice;
//                orderItem.discountPercentage = 0 ;
//                totalDiscountAmount = totalDiscountAmount + ((orderItem.itemMarketPrice - orderItem.salePrice) * orderItem.quantity);

   
//                salesOrder.orderItems.push(orderItem);
//                if (rowNo === 1) {
//                    salesOrder.vendorDiscount = 0;
//                    salesOrder.onlineReferenceNo = orderlocal.onlineReferenceNo;
//                    salesOrder.status = "pending";
   
//                    //salesOrder.createdAt = (new Date()).toString();
//                    let paymentMode = 0;
                   
//                    switch (item.paymentMethod) {
//                        case "ccavenue":
//                            paymentMode = 2;
//                            break;
//                        // case "cod":
//                        //     paymentMode = "cod";
//                        //   break;
//                        // case "Credit Card":
//                        //     paymentMode = 2;
//                        //   break;
                    
   
//                        // case "Credit Sale":
//                        //     paymentMode = 3;
//                          // break;
//                        default:
//                            paymentMode = 2;
//                    }
                   
   
//                    salesOrder.paymentMode = paymentMode;
//                    salesOrder.shippingAddress1 = item.shippingAddress;
//                    salesOrder.shippingAddress2 = "";
//                    salesOrder.shippingState = item.state;
//                    salesOrder.shippingCountry = "India"; //item.country;
//                    salesOrder.shippingPincode = item.zipCode 
//                    salesOrder.shippingMobile = orderlocal.farmerPhoneNumber;
//                    salesOrder.shippingCharge = item.shippingPrice;
//                    salesOrder.packingCharge = 0;
   
//                    salesOrder.customerName = orderlocal.farmerName;
//                    // salesOrder.customerAddressLine1 = item.streetAddress;
//                    salesOrder.customerAddressLine2 = item.streetAddress;
//                    salesOrder.customerArea = item.city;
//                    salesOrder.customerState = item.state;
//                    salesOrder.customerCountry = "India";
//                    salesOrder.customerPincode = item.zipCode;
//                    salesOrder.customerMobile = orderlocal.farmerPhoneNumber || item.phoneNumber;
//                    salesOrder.customerPhone = orderlocal.farmerPhoneNumber || item.phoneNumber;
//                    salesOrder.customerEmail = item.email || "prabindchauhan99@gmail.com";
//                    salesOrder.outletId = item.productDetails.goFrugalShopId
//                    // salesOrder.outletId = "2668"
//                }
//                rowNo++;
//                //}); //Item
//            });
   
//            salesOrder.totalQuantity = orderlocal.totalProducts;
//            salesOrder.totalAmount = orderlocal.totalPrice;
//            salesOrder.totalTaxAmount = totalTaxAmount;
//            salesOrder.shipmentItems = rowNo - 1;
//            salesOrder.totalDiscountAmount = totalDiscountAmount;
        
//            salesOrder.shippingId = "XXX";
//            salesOrder.shippingName = orderlocal.farmerName;
//            salesOrder.orderRemarks = orderlocal.trackingCode;
   
//            finalData.salesOrder = salesOrder;
//            finalData.Channel = "TruePOS";  
       
//           //  let res = await axios.post(goFrugalOrderUpdateURL, finalData, {
//           //     headers: {
//           //         'Content-Type': 'application/json',
//           //         'X-Auth-Token': `${goFrugalApiKey}`
//           //     }
//           //  }   
//     //  );
     
           
   
//        } catch (e) {
//           console.log(e)
//        }
   
//       // await SMS.smssend(phoneCheck);
//       return res.redirect(process.env.userWebUrl + "/cart/checkout/success"); 
//     }
//     //return next();
//     }
//     catch (e) {
//       return next(e);
//     }
    
// };


// exports.callback = async (req, res, next) => {
//   try {
//     if (!req.query.token) {
//       return res.status(403).end();
//     }

//     if (req.query.action === 'success') {
//       const transaction = await DB.Transaction.findOne({
//         paymentToken: req.query.token
//       });
//       if (!transaction) {
//         return next(PopulateResponse.notFound());
//       }

//       if (['shop_featured', 'order'].indexOf(transaction.type) > -1) {
//         // TODO - check payer id, etc
//         await Service.Payment.executePaypalSinglePayment(transaction, req.query);
//       } else {
//         return next(PopulateResponse.forbidden());
//       }

//       if (transaction.meta && transaction.meta.redirectSuccessUrl) {
//         return res.redirect(transaction.meta.redirectSuccessUrl);
//       }
//     } else {
//       const transaction = await DB.Transaction.findOneAndUpdate({
//         paymentToken: req.query.token
//       }, {
//         $set: {
//           status: 'cancelled'
//         }
//       });

//       if (transaction.meta && transaction.meta.redirectCancelUrl) {
//         return res.redirect(transaction.meta.redirectCancelUrl);
//       }
//     }

//     res.locals.callback = {
//       ok: true
//     };
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// };

// exports.hook = async (req, res, next) => {
//   try {
//     // in dev env, use this https://webhook.site/0c601e24-0e06-4b0d-8173-b510f2c0e8d1
//     // TODO - change me
//     // https://github.com/paypal/PayPal-REST-API-issues/issues/99
//     // subscribe for PAYMENT.SALE.COMPLETED only
//     // https://github.com/paypal/PayPal-REST-API-issues/issues/228
//     // There's an issue with sandbox webhooks. It's sort of on and off at this time. We are pushing to get it fixed
//     // but it should not happen in production environment.
//     // Webhooks is recommended for REST API. I don't have info on IPN configuration.
//     // https://stackoverflow.com/questions/26351367/paypal-rest-api-billing-agreements-webhooks
//     // I can confirm that when a recurring payment is executed, one is notified via webhook event PAYMENT.SALE.COMPLETED
//     // as described here: https://github.com/paypal/PayPal-Python-SDK/issues/132#issuecomment-261374087
//     // JSON structure of the webhook event:
//     // {
//     //    ...
//     //    "resource": {
//     //        ...
//     //        "billing_agreement_id": "I-38097XVV6XVU"
//     //        ...
//     //    }
//     //    ...
//     // }
//     // A list of all event names can be found here: https://developer.paypal.com/docs/integration/direct/webhooks/event-names/
//     // TODO - validate me
//     if (!req.body.event_type || !req.body.resource) {
//       return res.status(400).send();
//     }

//     // await Payment.updatePaypalTransaction(req.body);
//     // res.locals.hook = {
//     //   ok: true
//     // };
//     return next();
//   } catch (e) {
//     return next();
//   }
// };
