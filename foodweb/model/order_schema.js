const mongoose= require('../database/db');
const Schema = mongoose.Schema;

const orderSchema=new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: "India"
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },
    
    orderItems: [
        {
            foodName:{
                type: String,
                // required: true
            },
            price:{
                type: Number,
                // required: true
            },
            quantity:{
                type: Number,
                // required: true
            },
            image:{
                type: String
            },
            foodId:{
                type: mongoose.Schema.ObjectId,
                ref: "Food",
                required: true
            }
        }
    ],
    itemPrice:{
        type: Number,
        default:0
    },
    taxPrice:{
        type: Number,
        default:0
    },
    shippingPrice:{
        type: Number,
        default:0
    },
    totalPrice:{
        type: Number,
        default:0
    },
    orderStatus:{
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,
    createAt: {
        type: Date,
        default: Date.now,
    }
});


const Order=mongoose.model('Order', orderSchema);
module.exports= Order;