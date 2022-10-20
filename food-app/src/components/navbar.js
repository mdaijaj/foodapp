import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css" 
import cartLogo from '../images/carts.png'

const Navbar = (props) => {
    const navigate = useNavigate()
    const cardata= localStorage.getItem("itemscart")
    console.log("cardata", cardata)

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img src="https://image.similarpng.com/very-thumbnail/2020/06/Restaurant-logo-with-chef-drawing-template-on-transparent-background-PNG.png" style={{ borderRadius: "50%" }} width="100" height="100" className="d-inline-block align-top" alt="image path not found" />
                    </NavLink>
                    Restaurant Order Food
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addhotel">Add Restaurant</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addservice">Add Food Service</NavLink>
                            </li>
                        </ul>
                        {!localStorage.getItem('user') ?
                            <form className='d-flex'>
                                <Link className='btn btn-dark mx-2' to="/signup" role="button">Signup</Link>
                                <Link className='btn btn-dark mx-2' to="/login" role="button">Login</Link>
                                {/* <img src={cartLogo} ></img> */}
                                <Link className='' to="#"  role="button" >
                                    <img src={cartLogo} width="50" height="40" className="d-inline-block align-top" alt="image path not found" />
                                </Link>
                            </form>
                            :
                            <>
                                <button onClick={handleLogout} className='btn btn-dark'>Logout</button>
                                <h4 style={{ padding: "20px" }}>{JSON.parse(localStorage.getItem('user')).user_detail.name}</h4>
                                <Link className='' to="/cartlist"  role="button" >
                                    <p style={{color: "black", margin: "-13px", fontSize: "bold"}}>{cardata}</p>
                                    <img src={cartLogo} width="50" height="40" className="d-inline-block align-top" alt="image path not found" />
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}



export default Navbar;
