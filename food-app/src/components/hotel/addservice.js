import React, {useState} from "react";
import axios from 'axios'
import "../../App.css"  //22


const ServiceAdd = () => {
    const [serviceData, setService] = useState({
        aminites: "",
        roomtype: "",
        basic: "",
        health: "",
        foodType: "",
        fun_things: "",
        parking: ""
    });

    let name, value;
    const handleInputs= async(event)=>{
        name= event.target.name
        value= event.target.value
        console.log("value", value)
        console.log("serviceData", serviceData)
        setService({...serviceData, [name]: value})  //[] dynamic data for
    }

    const addservice= async(e)=>{
        e.preventDefault();
        const {hotelId, hotel_name,amenities, roomType, basic, health, foodType, funThings, transport}= serviceData ;
        const serviceInf= {hotelId, hotel_name,amenities, roomType, basic, health, foodType, funThings, transport}
        console.log("serviceInf", serviceInf)
        const res= await axios.post('/createservice', {serviceInf})
        console.log("res", res)
        if(res.status===400 || !res){
            window.alert("Invalid Registration");
            console.log("Invalid Registration")
        }
        else{
            window.alert("add hotel successfully!")
            console.log("add hotel is successfully")
            // history.push('/home')
        }
    }

    return (
        <>
            <h2>Service Available</h2>
        <form method="Post" className="row g4">
            
            <div className="col-md-4">
                <label for="inputEmail4" className="form-label">Hotel Id</label>
                <input type="text" className="form-control" name="hotelId" id="inputEmail4" />
            </div>
            <div className="col-md-4">
                <label for="inputEmail4" className="form-label">Hotel Name</label>
                <input type="text" className="form-control" name="hotel_name" id="inputEmail4" />
            </div>
            <div className="col-md-4">
                <label for="inputEmail4" className="form-label">Amenities</label>
                <input type="text" className="form-control" name="amenities" id="inputEmail4" />
            </div>
            <div className="col-md-4">
                <label for="inputState" className="form-label">Room Type</label>
                <select id="inputState" className="form-select" name="roomType">
                    <option selected>Single Room</option>
                    <option>Family</option>
                    <option>Hall Room</option>
                    <option>Double Room</option>
                    <option>Friend Room</option>
                </select>
            </div>
            <div className="col-md-4">
                <label for="basic" className="form-label">Basic</label>
                <input type="text" className="form-control" onChange={handleInputs} id="basic" name="basic" />
            </div>
            <div className="col-md-4">
                <label for="inputEmail4" className="form-label">Health Safety</label>
                <input type="text" className="form-control" onChange={handleInputs} id="inputEmail4" name="health" />
            </div>

            <div className="col-md-4">
                <label for="inputState" className="form-label">Food Type</label>
                <select id="inputState" className="form-select" name="foodType">
                    <option selected>Snack</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Drink</option>
                </select>
            </div>

            <div classNameName="col-md-6">
                <lable>Fun Things :-  </lable>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" name="funThings" value="option1" />
                    <label className="form-check-label" for="inlineCheckbox1">Restaurant</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" name="funThings" value="option2" />
                    <label className="form-check-label" for="inlineCheckbox2">Dance Bar</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" name="funThings" value="option2" />
                    <label className="form-check-label" for="inlineCheckbox2">Game activity</label>
                </div>
            </div>

            <div classNameName="col-md-6"> Parking :-
                <div className="form-check form-check-inline" >
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" name="transport" />
                    <label className="form-check-label" for="inlineCheckbox1">Available</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" name="transport" />
                    <label className="form-check-label" for="inlineCheckbox2">Dance Bar</label>
                </div>
            </div>
            <div className="col-12">
                <input type="submit" className="form-submit" name="addhotel" id="addhotel" onClick={addservice}/>
            </div>
        </form>

        </>
    )
}

export default ServiceAdd;