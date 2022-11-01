import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../App.css'
import deleteIcons from '../images/delete-icon.png'


const Cart = () => {
    const [restList, setRestList] = useState([])
    const [findRest, setFindRest] = useState([])
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate();

    let totalAmount=0
    let deliverycharge= 50
    let taxAmount=0
    let count=0

    const getAllRest = async () => {
        const response = await axios.get('/cartlist');
        console.log("response4", response)
        setRestList(...restList, response)
        setFindRest(response.data.data)
        return response
    }

    const itemDetails = async (id) => {
        let statue = false
        console.log("aijaj", id)
        const response = await axios.put(`/removetocart/${id}`, {
            cartStatus: statue,
        });
        console.log("response3", response)
        // console.log("updateresponse", response.data)
        setFindRest([response.data.result])
        return response
    }

    const gatewayPayment=()=>{
        // alert("please select payment method!")
        navigate('/payment')
    }
    const users= localStorage.setItem("itemscart", findRest.length)

    useEffect(() => {
        getAllRest()
    }, [findRest])

    return (
        <>
            <center><h1>add to cart food item......</h1></center><br />
            <div className="container">
                <ul className="row list-ul">
                    {loading ? "please wait data is loading" : ""}
                    {console.log("findRest", findRest)}
                    {
                        findRest?.map((rest => {
                            totalAmount+=rest.price
                            { console.log("rest", rest) }
                            return (
                                <>
                                    {/* <div className="" style={{textDecoration: "none", border: "3px solid green"}}> */}
                                    <div className="col-8 li-list">
                                        <div className="row">
                                            <div className="col-6 d-flex justify-content-center">
                                                <img src="https://i.pinimg.com/474x/d2/b0/10/d2b01052124d637b98d00d0e595b8965.jpg"
                                                    width="40" height="30" 
                                                    onClick={() => itemDetails(rest._id)} />
                                                    
                                                <div className="card" style={{ width: "35rem", borderRadius: "20px" }}>
                                                    <img className="card-img-top" src="https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-mumbai/dining/detail/ziya---3.jpg?w=724&hash=dcf2c5714715cad3d4b3f30391636aa0" alt="Card image cap" />
                                                </div>
                                            </div>
                                            <div className="col-6" style={{ textAlign: "left" }}>
                                                <h3 className="card-title">{rest.foodName}</h3>
                                                <p className="card-text">{`foodType: ${rest.foodType}`}</p>
                                                <p className="card-text">{`price: ${rest.price}`}</p>
                                                <p className="card-text">
                                                    <button > - </button> {`Quantity: ${1} `} <button> + </button>
                                                </p>
                                                <p className="card-text">{`takeTime: ${rest.takeTime}`}</p>
                                                <p className="card-text">{`city: ${rest.restId.city}`}</p>
                                                <p className="card-text">   {`numOfReviews: 4`}</p>
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
            <div className="amount">
                <h1>Payment Information</h1>
                <div className="amount">
                    <h5>Total Item: {findRest.length} </h5>
                    <h5>Net Amount: {totalAmount} </h5>
                    <h5>Tax:  {totalAmount * 18/100}</h5>
                    <h5>Delivery Charge:  {deliverycharge} </h5>
                    <h5>Total Amount: {totalAmount + deliverycharge + totalAmount * 18/100} </h5><br/>
                    <button className="btn btn-success" onClick={gatewayPayment}>Check</button>
                </div>
            </div>
        </>
    );
};

export default Cart;