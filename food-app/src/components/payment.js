import React from "react"

const Payment = () => {

    const getData=(data)=>{
        return fetch('/paynow', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "applicatin/json"
            },
            body: JSON.stringify(data),
        }).then(response=> console.log("aijaj", response.json()))
        .catch(err=> console.log(err.message))
    }

    const makePayment=()=>{
        getData({amount: 500, email: "aijaj535@gmail.com"})
        .then(response => console.log("response", response))
        .catch(err => console.log(err))
    }
    
    return (
        <>
            <center><h1>Paytm Online Payment</h1></center>
            <div className="row my-5">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-body">
                            <form className="" action="/paynow" method="post">
                                <div className="form-group">
                                    <label for="">Name: </label>
                                    <input className="form-control" type="text" name="name" id="name" value="" />
                                </div>
                                <div className="form-group">
                                    <label for="">Email: </label>
                                    <input className="form-control" type="text" name="email" value="" />
                                </div>
                                <div className="form-group">
                                    <label for="">Phone: </label>
                                    <input className="form-control" type="text" name="phone" value="" />
                                </div>
                                <div className="form-group">
                                    <label for="">Amount: </label>
                                    <input className="form-control" type="text" name="amount" value="" />
                                </div>
                                <div className="form-group">
                                    <button className="btn form-control btn-primary">Pay Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-success" onClick={makePayment}>Pay Now</button>

        </>
    )
}

export default Payment;