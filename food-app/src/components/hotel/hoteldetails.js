import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../../App.css'
import { useParams } from "react-router-dom";
// import Filter from "../filter";
import "./hotel.css";



const HotelDetails = () => {

  const [findRest, setFindRest] = useState([])
  const { id } = useParams()
  console.log("id", id)
  const navigate = useNavigate();

  const [hotelList, setHotelList] = useState([])
  const [findhotel, setFindhotel] = useState([])
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(null)

  const hotelDetail = async () => {
    const response = await axios.get(`/restdetails/${id}`);
    console.log("response2", response)
    setHotelList(...hotelList, response)
    setFindRest(response.data.data)
    setFindhotel(response.data.data)
    // return response
  }

  let allCarts = []
  const itemDetails = async (id) => {
    console.log("aijaj", id)
    let status = true
    const response = await axios.put(`/updatetocart/${id}`, {
      updateCart: status,
    });
    console.log("response3", response)
    alert("add to cart")
    allCarts.push(response.data.data)
    return allCarts
  }

  const searchRestaurant = async () => {
    console.log("aijajkhan1", findRest)
    console.log("destination", destination)
    const findresult= await findRest.filter((item=> item.foodName==destination))
    setFindRest(findresult)
}

const foodItemDetails=(id)=>{
  console.log("aijaj", id)
  navigate(`/fooditemdetails/${id}`)
}

  useEffect(() => {
    hotelDetail()
  }, [])

  return (
    <>
      <div className="main" style={{ width: "90%", height: "200px", margin: "auto", borderRadius: "25px" }}>
        <form>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <label /> Food Item Name:
                <input type="text" className="form-control" onChange={(e) => setDestination(e.target.value)} placeholder="Search Food...." />
              </div>
              <div className="col-2">
                  <label htmlFor="exampleFormControlSelect1">Hotel Type:</label>
                  <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setDestination(e.target.value)}>
                      <option>Food Type</option>
                      <option>Break Fast</option>
                      <option>Lunch </option>
                      <option>Dinner</option>
                      <option>Drink</option>
                  </select>
              </div>
              <div className="col-2 pt-4">
                <button type="button" onClick={searchRestaurant}>Search</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <h1> Food List details</h1>
      <div className="container">
        <ul className="row list-ul">
          {loading ? "please wait data is loading" : ""}
          {
            findRest?.map((rest => {
              { console.log("rest", rest) }
              return (
                <>
                  {/* <div className="" style={{textDecoration: "none", border: "3px solid green"}}> */}
                  <div className="col-12 li-list">
                    <div className="row">
                      <div className="col-6 d-flex justify-content-center">
                        <div className="card" style={{ width: "35rem", borderRadius: "10px" }}>
                          <img className="card-img-top" src="https://www.expatica.com/app/uploads/sites/6/2014/05/german-food-1920x1080.jpg" height="345px" alt="Card image cap" />
                        </div>
                      </div>
                      <div className="col-6" style={{ textAlign: "left" }}>
                        <h3 className="card-title">{rest.foodName}</h3>
                        <h5 className="card-text">{`RestaurantName: ${rest.restId.restName}`}</h5>
                        <p className="card-text">{`takeTime: ${rest.takeTime}`}</p>
                        <p className="card-text">{`foodType: ${rest.foodType}`}</p>
                        <p className="card-text">{`price: ${rest.price}`}</p>
                        <p className="card-text">{`city: ${rest.city}`}</p>
                        <p className="card-text">{`state: ${rest.state}`}</p>
                        <p className="card-text">   {`numOfReviews: 4`}</p>
                        {/* <NavLink to={`/fooditemdetails/${rest._id}`} className="btn btn-primary">Food Detail</NavLink> */}
                        <button className="btn btn-primary" onClick={()=> foodItemDetails(rest._id)}>Hotel</button>
                        <button className="btn btn-danger" onClick={() => itemDetails(rest._id)} style={{ marginLeft: "10px" }}>add to cart</button>
                        <NavLink to="/cartlist" className="btn btn-success" style={{ marginLeft: "10px" }}>Order Now</NavLink>
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