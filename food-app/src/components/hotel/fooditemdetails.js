import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import '../../App.css'
import { useParams } from "react-router-dom";
import "./hotel.css";
import { photos } from "../../images/images"

const FoodItemDetails = () => {

  const navigate = useNavigate();
  const {id} = useParams()
  console.log("foodid", id)

  const [findhotel, setFindhotel] = useState(null)
  const [loading, setLoading] = useState(null)

  const hotelDetails = async (id) => {
    const response = await axios.get(`/servicedetails/${id}`);
    console.log("rahulkhan", response)
    setFindhotel(response.data.data)
    return response
  }

  const paymentDetails = async (id) => {
    navigate('/payment')
  }

  useEffect(()=>{
    hotelDetails(id)
  }, [])

  return (
    <>

    {findhotel? 
        <div className="col-10 d-flex justify-content-center">
          <div className="card" style={{ width: "35rem", borderRadius: "20px" }}>
            <img className="card-img-top" src="https://www.eatthis.com/wp-content/uploads/sites/4/2019/06/deep-dish-pizza-chicago.jpg" alt="Card image cap" />
            <div className="card-body">
              <h1 className="card-title">{findhotel.foodName}</h1>
              <p className="card-text">{`foodType: ${findhotel.foodType}`}</p>
              <p className="card-text">{`takeTime: ${findhotel.takeTime}`}</p>
              <p className="card-text">{`price: ${findhotel.price}`}</p>
              <p className="card-text">{`rating: ${findhotel.restId.rating}`}</p>
              <p className="card-text">{`address: ${findhotel.restId.address}`}</p>
              <p className="card-text">{`city: ${findhotel.restId.city}`}</p>
              <p className="card-text">{`contactNo: ${findhotel.restId.contactNo}`}</p>
              <p className="card-text">{`restName: ${findhotel.restId.restName}`}</p>
              <p className="card-text">{`state: ${findhotel.restId.state}`}</p>
              <p className="card-text">{`description: ${findhotel.restId.description}`}</p>
              <button className="btn btn-success" onClick={"paymentDetails"}>Reserve or Book Now!</button>
            </div>
          </div>
        </div> : 
        <>
        <br/>
        <h2> loading......</h2>
        </>
    }
    </>
  )
}

export default FoodItemDetails;