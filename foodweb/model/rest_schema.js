const mongoose=require('../database/db');
const Schema = mongoose.Schema

var rest_schema=  new Schema({
    restName: {
       type: String,
       required: true,
       trim: true
    },
    description: {
        type: String,
        trim: true
    },
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
    },
    contactNo: {
        type: Number,
        trim: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        trim: true
    },
    address: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // isDelete: {
    //     type: Boolean,
    //     default: false
    // },
    foodId: {
        type: mongoose.Schema.ObjectId,
        ref: "Food",
        required: [false, "please enter your food item Id"],
    },
    images: [String]
}, {
    timestamps: true
});

const Rest=mongoose.model('Rest', rest_schema);
module.exports= Rest;