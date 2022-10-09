const mongoose=require('../database/db');
const Schema = mongoose.Schema

var foodServiceSchema=  new Schema({
    foodName: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    foodType: {
       type: String,
       enum :['breakfast', 'lunch', 'dinner', 'drink'],
       default: 'lunch'
    },
    price: {
        type: Number,
        trim: true
    },
    rating:{
        type:Number,
        trim: true,
    },
    takeTime: {
        type: Date,
        trim: true,
        default: Date.now()
    },
    restId: {
        type: mongoose.Schema.ObjectId,
        ref: "Rest",
        required: [true, "please enter your Rest Id"],
        strictPopulate: false
    },
    // categoryId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Category",
    //     required: [false, "please enter your Rest Id"],
    //     strictPopulate: false
    // },
    cartStatus: {
        type: Boolean,
        default: false    
    },
    photo: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const FoodService=mongoose.model('Food', foodServiceSchema);
module.exports= FoodService;


