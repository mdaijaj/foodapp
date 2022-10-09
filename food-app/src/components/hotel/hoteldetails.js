import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../../App.css'
import { useParams } from "react-router-dom";
import Filter from "../filter";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCircleArrowLeft,
//   faCircleArrowRight,
//   faCircleXmark,
//   faLocationDot,
// } from "@fortawesome/free-solid-svg-icons";
import "./hotel.css";
import {photos} from "../../images/images"
// import images from "../../images.jpeg"


const HotelDetails = () => {

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [findRest, setFindRest] = useState([])

  const navigate = useNavigate();
  const { id } = useParams()
  console.log("id", id)

  const handleClick = () => {
    if (id) {
      setOpenModel(true)
    } else {
      navigate('/login')
    }
  }


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hotelList, setHotelList] = useState([])
  const [findhotel, setFindhotel] = useState([])
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(null)

  const hotelDetails = async () => {
    const response = await axios.get(`/restdetails/${id}`);
    console.log("response2", response)
    setHotelList(...hotelList, response)
    setFindRest(response.data.data)
    setFindhotel(response.data.data)
    return response
  }
  let allCarts=[]
  const itemDetails= async(id)=>{
    console.log("aijaj", id)
    
    let statue=true
    const response = await axios.put(`/updatetocart/${id}`, {
      updateCart: statue,
    });
    

    console.log("response3", response)
    allCarts.push(response.data.data)
    return allCarts
  }


  useEffect(() => {
    hotelDetails()
  }, [])


  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  };

  return (
    <>

      <Filter/>   
      <h1> Hotel details</h1>
      <div className="container">
      <ul className="row list-ul">
        {loading? "please wait data is loading": ""}
        {
            findRest?.map((rest => {
          {console.log("rest", rest)}
          return (
              <>
              {/* <div className="" style={{textDecoration: "none", border: "3px solid green"}}> */}
              <div className="col-12 li-list">
                  <div className="row">
              <div className="col-6 d-flex justify-content-center">
                  <div className="card" style={{ width: "35rem", borderRadius: "10px" }}>
                      <img className="card-img-top" src="https://img.freepik.com/free-photo/paneer-butter-masala-cheese-cottage-curry-served-with-rice-laccha-paratha_466689-73715.jpg?w=1380&t=st=1665281265~exp=1665281865~hmac=1ac9ebd7a60b41eed0a618701cbd16974c2ee4bf5b352927220b70040ecb5190"  height= "345px" alt="Card image cap" />
                  </div>
              </div>
              <div className="col-6"  style={{textAlign: "left"}}>
                  <h3 className="card-title">{rest.foodName}</h3>
                  <h5 className="card-text">{`RestaurantName: ${rest.restId.restName}`}</h5>
                  <p className="card-text">{`takeTime: ${rest.takeTime}`}</p>
                  <p className="card-text">{`foodType: ${rest.foodType}`}</p>
                  <p className="card-text">{`price: ${rest.price}`}</p>
                  <p className="card-text">{`city: ${rest.city}`}</p>
                  <p className="card-text">{`state: ${rest.state}`}</p>
                  <p className="card-text">   {`numOfReviews: 4` }</p>
                  <NavLink to={`/restdetails/${rest._id}`} className="btn btn-primary">Food Details</NavLink>
                  <button className="btn btn-danger" onClick={()=> itemDetails(rest._id)}>add to card</button>
                  {/* <button className="btn btn-primary" onClick={hotelDetails}>Hotel</button> */}
              {/* </div> */}
              </div>
              </div>
              </div>
              </>
            )
          }))
        }
        </ul>
        </div>
    </>
  )
}

export default HotelDetails;