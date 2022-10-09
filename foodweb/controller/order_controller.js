const FoodService= require('../model/food_schema')
const Order= require('../model/order_schema')

const newOrder= async(req,res)=>{
    const { shippingInfo, orderItems, itemPrice, shippingPrice, taxPrice, totalPrice, orderStatus}= req.body
    console.log("api is working.....")
    const order= await Order.create({
        shippingInfo, orderItems, itemPrice, shippingPrice, taxPrice, totalPrice,orderStatus,
        paidAt: Date.now(),
        // user: "userId"
    })
    return res.status(200).send({success: true, result: order})
}


//single data of user order
const singleOrder= async(req,res)=>{
    console.log("api is working...")
    console.log("req.params.id", req.params)
    const order= await Order.findById(req.params._id).populate(
        "user", 
        "email name"
    )
    console.log("order", order)
    if(!order){
        console.log("not found orders number")
    }
    return res.status(200).send({success: true, result: order})
}


//user logged in and my orders userInformation.
const myOrder= async(req,res)=>{
    console.log("req.user.id", req.user.id)
    const order= await Order.find({user:req.user.id})
    if(!order){
        res.status(401).send("error while getting data...")
    }
    return res.status(201).send({success: true, result: order})
}


//all order of users
const allOrders= async(req,res)=>{
    const all_orders= await Order.find();
    if(!all_orders){
        return res.status(401).send("error while getting data...")
    }
    var totalAmount=0
    console.log("all_orders", all_orders)
    all_orders.forEach((order)=>{
        console.log("order,", order.totalPrice)
        totalAmount += order.totalPrice;
    });
    return res.status(200).send({
        messsage: "get allOrder success", 
        result: all_orders, 
        totalAmount: totalAmount
    })
}

//order update status
const orderUpdate= async(req,res)=>{
    console.log("update api is working...")
    const orders= await Order.findById(req.params.id);
    console.log("orders", orders)
    if(orders.orderStatus=="Delivered"){
        res.send("allready delivered the product...")
    }
    if(!orders){
        return res.send("there is not order of this user.")
    }
    orders.orderItems.forEach(async (order)=>{
        await updateStock(order.product, order.quantity)
    });
    orders.orderStatus= req.body;
    if(orders.orderStatus==="Delivered"){
        orders.deliveredAt= Date.now();
    }
    await orders.save({validateBeforeSave: false})
    return res.status(200).send({message: "order status update success....", result: orders})
}

async function updateStock(id, quantity){
    const product= await FoodService.findById(id);
    product.stock= quantity;
    await product.save({validateBeforeSave: false});
}


//delete orders
const deleteOrder= async(req,res)=>{
    const order= await Order.findById(req.params.id);
    console.log(order)
    await order.remove()
    return res.status(200).send({message: "order status update success....", result: order})
}

module.exports={
    newOrder,
    singleOrder,
    myOrder,
    allOrders,
    orderUpdate,
    deleteOrder
}