const mongoose=require('mongoose');
// require('dotenv').config;
// dotenv.config({path: './db.js'})
let url=process.env.DB || "mongodb+srv://aijaj:r6qM9ZRCTK0VHYGe@cluster0.2jomo.mongodb.net/foodapp?retryWrites=true&w=majority";

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("db connected successfully!")
}).catch((err)=>{
    console.log("errro while connected db,........")
    console.log(err.message)
})


module.exports=mongoose;