
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: "" });

    const onchangeHandle = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credential.email, password: credential.password
            })
        }
        const res = await fetch('/login', regInf);
        const result = await res.json()
        if (result.success) {
            console.log("result", result)
            alert("login successfully!")
            localStorage.setItem("user", JSON.stringify(result))
            navigate('/')
        }
        else {
            alert("invalid credential")
        }
    }

    useEffect(() => {
        let users = localStorage.getItem('user')
    }, [])

    return (
        <>


            {/* 
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
            </div> */}






<div className="container">

            <div className="row">
                <div className="col-2"></div>
                <div className="col-6">

                    <div className="main" style={{ textAlign: "left", margin: "auto", padding: "30px 30px", border: "2px solid black", borderRadius: "5px" }}>
                        <h2 style={{ textAlign: "center" }}>Login Page</h2>
                        <div className="mb-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label for="exampleInputEmail1"
                                        className="form-label">Email address
                                    </label>
                                    <input type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        onChange={onchangeHandle}
                                        value={credential.email}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"
                                        className="form-label">Password
                                    </label>
                                    <input type="password"
                                        className="form-control"
                                        value={credential.password}
                                        onChange={onchangeHandle}
                                        name="password"
                                        id="exampleInputPassword1" />

                                </div>
                                <center><button type="submit" className="btn btn-primary" >Submit</button></center>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
            </div>
        </>
    )
}

export default Login;