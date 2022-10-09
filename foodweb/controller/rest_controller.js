const Rests= require('../model/rest_schema')
// const dotenv = require("dotenv")
const zomato = require("zomato");
let Promise = require("promise")
let nodeGeo = require("node-geocoder");
const FoodService = require('../model/food_schema');

// dotenv.config();                                                //Configuring .env

//add restaurant admin only
const addRests= async (req, res)=>{
    try{
        const restInf= req.body
        const restData= await Rests.create({
            restName: restInf.restName, 
            description: restInf.description, 
            address: restInf.address,
            contactNo: restInf.contactNo,
            rating: restInf.rating,
            state: restInf.state,
            city: restInf.city
        })
        console.log("kishan", restData)
        return res.status(200).send({
            message:"admin rest add succuess!", 
            data: restData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// all restaurant get information
const allRests= async (req, res)=>{
    try{
        const restData= await Rests.find()
        return res.status(200).send({
            message:"get all hotel list ", 
            data: restData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// one restaurant get details
const restDetails= async (req, res)=>{
    try{
        console.log(req.params.id)
        const restData= await FoodService.find({
            restId: req.params.id
        })
        .populate("restId")
        console.log("restData", restData)
        if (!restData || restData==undefined){ 
            return  res.send("not found restaurant")
        }
        return res.status(200).send({
            message:"user resitered save data", 
            data: restData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}

// add to cart
const cartList= async (req, res)=>{
    try{
        const restData= await FoodService.find({
            cartStatus: true
        })
        .populate("restId")
        console.log("restData2", restData)
      
        if (!restData || restData==undefined){ 
            return  res.send("not found food item")
        }
        return res.status(200).send({
            message:"food resitered save data", 
            data: restData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


const updateToCart= async (req, res)=>{
    try{
        const cartStatus=true
        console.log("req.body", req.body)
        const updateData= await FoodService.findByIdAndUpdate({_id: req.params.id}, {
            $set:{cartStatus}
        })
        console.log("updateData", updateData)
        res.send({status: "update data successfully! ", "result": updateData})
    }
    catch(err){
        console.log(err.message)
    }
}

//search hotel
const searcRest= async(req,res)=>{
    try{
        const {city}= req.query
        const searchInfo= await Rests.find({
            city: city,
        })
        console.log("searchInfo", searchInfo)
        if(!searchInfo.length>0){
            return res.send({
                message: "Not found Restaurant!", data: searchInfo
            }) 
        }
        return res.send({
            message: "find Restaurant successfully!", data: searchInfo
        })
    }catch(err){
        console.log(err.message)
    }
}


module.exports= {
    addRests,
    allRests,
    restDetails,
    searcRest,
    cartList,
    updateToCart
}