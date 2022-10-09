import axios from "axios";
import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";
import '../App.css'


const Filter=()=>{
    const [destination, setDestination] = useState(null)
    const [restaurant, setRestaurant] = useState(null)
    const [restList, setRestList] = useState([])
    const [findRest, setFindRest] = useState([])


    const searchRestaurant = async () => {
        setFindRest(restList.data.data.filter(e => (e.city == destination)  || e.restaurant == restaurant))
    }


    return (
        <>
        <div className="main" style={{ width: "90%", height: "200px", margin: "auto", borderRadius: "25px" }}>
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
            </div>
        </>
    )
}

export default Filter;