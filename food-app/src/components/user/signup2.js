
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const [userInf, setUserInf] = useState({ email: "", password: "", mobile: "", name: "" });

    const inputHandle = (e) => {
        setUserInf({ ...userInf, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userInf.email,
                password: userInf.password,
                mobile: userInf.mobile,
                name: userInf.name
            })
        }
        const res = await fetch('/signup', regInf);
        const result = await res.json()
        console.log("result", result)
        if (result.success) {
            alert("user login success!")
            localStorage.setItem("token", result)
            navigate('/login')
        }
        else {
            alert("invalid credential")
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6">
                        
                        <div className="main" style={{ textAlign: "left", margin: "auto", padding: "30px 30px", border: "2px solid black", borderRadius: "5px" }}>
                        <h2 style={{textAlign: "center"}}>Signup Page</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label for="user-name" className="col-form-label" >Name:</label>
                                    <input type="text" className="form-control" onChange={inputHandle} name="name" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="col-form-label" onChange={inputHandle}>Email:</label>
                                    <input type="email" className="form-control" onChange={inputHandle} name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label for="mobile" className="col-form-label">mobile NO.:</label>
                                    <input type="number" className="form-control" onChange={inputHandle} name="mobile" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="col-form-label">Password:</label>
                                    <input type="password" className="form-control" onChange={inputHandle} name="password" minLength={5} required />
                                </div>
                                <center><button type="submit" className="btn btn-primary" >Submit</button></center>
                            </form>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}

export default Signup;