import axios from "axios";
import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";
import '../App.css'
// import {images} from '../images.jpeg'
import Filter from "./filter"


const HomeRestaurant = () => {
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    const [restList, setRestList] = useState([])
    const [findRest, setFindRest] = useState([])
    // const [destination, setDestination] = useState(null)
    // const [restaurant, setRestaurant] = useState(null)
    const [loading, setLoading]= useState(null)

    const getAllRest = async () => {
        console.log("dddd")
        const response = await axios.get('/allrests');
        console.log("response", response)
        setRestList(...restList, response)
        setFindRest(response.data.data)
        // return response
    }

    // const searchRestaurant = async () => {
    //     setFindRest(restList.data.data.filter(e => (e.city == destination)  || e.restaurant == restaurant))
    // }

    // const searchRestaurant = async () => {
    //     setFindRest(restList.data.data.filter(e => e.city == restaurant))
    // }


    // const hotelDetails=()=>{
    //     console.log("hotelDetails")
    // }

    useEffect(() => {
        getAllRest()
    }, [])

    return (
        <>
            {/* <div className="main" style={{ width: "90%", height: "200px", margin: "auto", borderRadius: "25px" }}>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label /> Location:
                                <input type="text" className="form-control" onChange={(e) => searchRestaurant(e.target.value)} placeholder="Enter City...." />
                            </div>

                            <div className="col-3">
                                <label /> Restaurant:
                                <input type="text" className="form-control" onChange={(e) => setRestaurant(e.target.value)} placeholder="Search Restaurant...." />
                            </div>

                            <div className="col-2">
                                <label htmlFor="exampleFormControlSelect1">Hotel Type:</label>
                                <select className="form-control" id="exampleFormControlSelect1">
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
            </div> */}


            
            <Filter/>
            <center><h1>Recenctly Restaurant Search....</h1></center><br />
            <div className="container">
            <ul className="row list-ul">
            {loading? "please wait data is loading": ""}

                {console.log("findRest", findRest)}
                {
                    findRest?.map((rest => {
                        {console.log("rest", rest)}
                        return (
                            <>
                            {/* <div className="" style={{textDecoration: "none", border: "3px solid green"}}> */}
                            <div className="col-12 li-list">
                                <div className="row">
                            <div className="col-6 d-flex justify-content-center">
                                <div className="card" style={{ width: "35rem", borderRadius: "20px" }}>
                                    <img className="card-img-top" src="https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-mumbai/dining/detail/ziya---3.jpg?w=724&hash=dcf2c5714715cad3d4b3f30391636aa0" alt="Card image cap" />
                                </div>
                            </div>
                            <div className="col-6" style={{textAlign: "left"}}>
                                <h3 className="card-title">{rest.restName}</h3>
                                <p className="card-text">{`description: ${rest.description}`}</p>
                                <p className="card-text">{`address: ${rest.address}`}</p>
                                <p className="card-text">{`rating: ${rest.rating}`}</p>
                                <p className="card-text">{`city: ${rest.city}`}</p>
                                <p className="card-text">{`state: ${rest.state}`}</p>
                                <p className="card-text">   {`numOfReviews: 4` }</p>
                                <NavLink to={`/restdetails/${rest._id}`} className="btn btn-primary">Food Available</NavLink>
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
    );
};

export default HomeRestaurant;