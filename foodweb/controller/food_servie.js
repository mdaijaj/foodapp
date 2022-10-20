const FoodService= require('../model/food_schema')

//add FoodService
const addService= async (req, res)=>{
    try{
        const serviceInfo= req.body
        console.log("serviceInfo:-", serviceInfo)
        const serviceData= await FoodService.create({
            restId: serviceInfo.restId, 
            foodName: serviceInfo.foodName, 
            price: serviceInfo.price,
            rating: serviceInfo.rating,
            foodType: serviceInfo.foodType,
        })
        return res.status(200).send({
            message:"add FoodService success!", 
            data: serviceData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// all FoodService
const allServices= async (req, res)=>{
    try{
        const serviceData= await FoodService.find()
        // const pipeline = [
        //     {
        //         '$lookup' : {
        //             'from' : "Rest",
        //             'localField' : "_id",
        //             'foreignField' : "restId",
        //             'as' : "addresses"
        //         }
        //     }
        // ]
        console.log(serviceData)
        return res.status(200).send({
            message:"user resitered save data", 
            data: serviceData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


//one hotel FoodService details
const serviceDetails= async (req, res)=>{
    try{
        console.log("iddd", req.params.id)
        const serviceData= await FoodService.findById({
            _id: req.params.id
        })
        .populate("restId")
        if (!serviceData || serviceData==undefined){ 
            return  res.send("not found userDtails")
        }
        console.log("serviceData", serviceData)
        return res.status(200).send({
            message:"user resitered save data", 
            data: serviceData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}

    
//update FoodService information
const updateService= async(req,res)=>{
    try{
        const {foodName, foodType, price,description,rate}=req.body
        console.log("req.body", req.body)
        const updateData= await FoodService.findByIdAndUpdate({_id: req.params.id}, {
            $set:{
                foodName, foodType, price
            }
        })
        console.log("updateData", updateData)
        res.send({status: "update data successfully! ", "result": updateData})
    }
    catch(err){
        console.log(err.message)
    }
}


//delete FoodService information
const deleteService= async (req, res)=>{
    try{    
        const deleteInf=await FoodService.findByIdAndRemove({_id: req.params.id});
        console.log("delete successfully!", deleteInf)
        return res.send({message: "delete successfully!", status: "success"})
    }catch(err){
        console.log(err.message)
    }
}


module.exports= {
    addService,
    allServices,
    serviceDetails,
    updateService,
    deleteService
}