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


const removeToCart= async (req, res)=>{
    try{
        const cartStatus=false
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



//search api
const restaurantSearch = (req, res) =>{
    // var zomatoJS = require('zomato.js')
    // var z = new zomatoJS("b34b63d226456ec371990ba3bc8961a4")       //zomato api key
    const client = zomato.createClient({userKey: '176bd0663551ddcc4cea2fcb9dc809bf'})

    let options = {
        provider : 'opencage',                                     //Geolocation provider(opencage/mapquest)
        httpAdapter : 'https',
        apiKey : "1010dc7d09ba48feb90da0770cbec556",               //Api Key provided by geolocation provider
        formatter : null
    }
    var geocoder = nodeGeo(options)

    const configKey = 'ssss';
    var accessToken = "";
    let name = req.body.city
    console.log("client", client)

    client.getLocations({query: name,}, (err, result) =>{
        if(!err){
            console.log("result:", result)
            let main_data = JSON.parse(result).location_suggestions;
            let latitude = JSON.stringify (main_data[0].latitude);
            let longitude = JSON.stringify (main_data[0].longitude);
            // console.log(lat);
            // console.log(lon);
            client.getGeocode({lat:latitude, lon:longitude},(err, result)=>{
                console.log("result2", result)
                if(!err){
                    // console.log(JSON.parse(result));
                    // res.send(result);
                    let data = JSON.parse(result).nearby_restaurants; 
                    // console.log("data", data)
                    let data_list = [];
                    for(var j of data){
                        var Dict={
                            name: j.restaurant.name,
                            address: j.restaurant.location.address,
                            average_cost_for_two: j.restaurant.average_cost_for_two,
                            price_range: j.restaurant.price_range,
                            has_online_delivery: j.restaurant.has_online_delivery,
                            cuisines: j.restaurant.cuisines,
                            featured_image: j.restaurant.featured_image,
                            url: j.restaurant.url,
                            photos_url: j.restaurant.photos_url
                        }
                        // console.log(Dict)
                        data_list.push(Dict);
                    }
                    // console.log(data_list);
                    return res.send(data_list)
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
}



module.exports= {
    addRests,
    allRests,
    restDetails,
    searcRest,
    cartList,
    updateToCart,
    removeToCart,
    restaurantSearch
}