const mongoose= require('../database/db');
const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const validator= require('validator')
const Schema = mongoose.Schema;

var user_schema=  new Schema({
    name: {
        type: String,
        maxlength: [30, "Name cannot exceed 30 charactor"],
        min: [4, "name should be more than 4 charactor"]
     },
     email: {
         type: String,
         required: [true, "please enter your email"],
         unique: true,
         validate: [validator.isEmail, "please enter valid email id"]
     },
     mobile: {
         type: Number,
         required: true
     },
     password: {
      type: String,
    //   select: false
    },
    roll: {
        type: String,
        default: "customer",
    },
});

//hashing password
user_schema.pre("save", async function (next){
    console.log("Hi i am pre password using...")
    if(this.isModified('password')){
        console.log("password modified...")
        this.password= await Bcrypt.hash(this.password, 12)
    }
    next()
})


//using jwt generate token
user_schema.methods.generateAuthToken= async function(){
    try{
        const token=await jwt.sign({id: this._id}, "aijajkhan", {expiresIn: "10 min"});
        return token;
    }
    catch(err){
        console.log("not token verify", err.message)
    }
}


const User=mongoose.model('User', user_schema);
module.exports= User;