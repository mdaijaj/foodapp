import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../App.css'
import deleteIcons from '../images/delete-icon.png'


const Cart = () => {
    const [restList, setRestList] = useState([])
    const [findRest, setFindRest] = useState([])
    const [loading, setLoading]= useState(null)

    const getAllRest = async () => {
        const response = await axios.get('/cartlist');
        console.log("response4", response)
        setRestList(...restList, response)
        setFindRest(response.data.data)
        return response
    }

    const itemDetails= async(id)=>{
        console.log("aijaj", id)
        let status=false
        const response = await axios.put(`/updatetocart/${id}`, {
          updateCart: status,
        });
        console.log("response3", response)
        setFindRest(response.data.data)
        return response
      }

    useEffect(() => {
        getAllRest()
    }, [findRest])

    return (
        <>
            <center><h1>add to cart food item......</h1></center><br />
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
                            <img src="https://i.pinimg.com/474x/d2/b0/10/d2b01052124d637b98d00d0e595b8965.jpg" 
                                width="50" height="50" 
                                onClick={()=>itemDetails(rest._id)}/>

                                <div className="card" style={{ width: "35rem", borderRadius: "20px" }}>
                                    <img className="card-img-top" src="https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-mumbai/dining/detail/ziya---3.jpg?w=724&hash=dcf2c5714715cad3d4b3f30391636aa0" alt="Card image cap" />
                                </div>
                            </div>
                            <div className="col-6" style={{textAlign: "left"}}>
                                <h3 className="card-title">{rest.foodName}</h3>    
                                <p className="card-text">{`foodType: ${rest.foodType}`}</p>
                                <p className="card-text">{`price: ${rest.price}`}</p>
                                <p className="card-text">{`takeTime: ${rest.takeTime}`}</p>
                                <p className="card-text">{`city: ${rest.restId.city}`}</p>
                                <p className="card-text">   {`numOfReviews: 4` }</p>
                                <p className="card-text">{`address: ${rest.restId.address}`}</p>
                                <NavLink to={`/restdetails/${rest._id}`} className="btn btn-primary">Book</NavLink>
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

export default Cart;