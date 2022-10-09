import React, {useState} from "react";
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddHotel = () => {
    const [hoteldata, setHoteldata] = useState({
        hotel_name: "",
        description: "",
        email: "",
        password: "",
        address: "",
        contactNo: "",
        price: "",
        hoteltype: "",
        role: "",
        city: "",
        guest: "",
        rating: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    let name, value;
    const handleInputs= async(event)=>{
        name= event.target.name
        value= event.target.value
        console.log("value", value)
        setHoteldata({...hoteldata, [name]: value})  //[] dynamic data for
    }


    const addhotelInf= async(e)=>{
        e.preventDefault();
        const {hotel_name, description, email, password, address, contactNo, price, hoteltype,role, state, city, guest, rating}= hoteldata ;
        const hotelInf= {hotel_name, description,email, password, address, contactNo, price, hoteltype,role, state, hoteltype,role, city, startDate,guest, endDate, rating}
        // console.log("hoteldata", hotelInf)
        const res= await axios.post('/addhotel', {hotelInf})
        console.log("res", res)
        if(res.status===400 || !res){
            window.alert("Invalid Registration");
            console.log("Invalid Registration")
        }
        else{
            window.alert("add hotel successfully!")
            console.log("add hotel is successfully")
            // history.push('/home')
        }
    }

    return (
        <form method="Post" className="row">
            <div className="col-md-4">
                <label for="hotel_name" className="form-label">Hotel Name</label>
                <input type="text" className="form-control" name="hotel_name"  onChange= {handleInputs} id="hotel_name" />
            </div>
            <div className="col-md-4">
                <label for="description" className="form-label">Description</label>
                <input type="text" className="form-control" name="description" onChange= {handleInputs} id="description" />
            </div>
            <div className="col-md-4">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" name="email" onChange= {handleInputs} id="inputEmail4" />
            </div>
            <div className="col-md-4">
                <label for="price" className="form-label">Price</label>
                <input type="number" className="form-control" name="price" onChange= {handleInputs} id="price" />
            </div>
            <div className="col-4">
                <label for="address" className="form-label">Address</label>
                <input type="text" className="form-control" onChange= {handleInputs} name="address" id="address" placeholder="1234 Main St" />
            </div>
            <div className="col-md-4">
                <label for="state" className="form-label">State</label>
                <select id="state" name="state" className="form-select" onChange={handleInputs}>
                    <option selected>Choose...</option>
                    <option>Delhi</option>
                    <option>Maharast</option>
                    <option>karnataka</option>
                    <option>Rajasthan</option>
                    <option>Hariyana</option>
                    <option>Punjab</option>
                </select>
            </div>
            <div className="col-md-4">
                <label for="city" className="form-label">City</label>
                <input type="text" className="form-control" name="city" onChange= {handleInputs} id="city" />
            </div>

            <div className="col-md-4">
                <label for="hoteltype" className="form-label">Hotel Type</label>
                <select id="hoteltype" className="form-select" onChange= {handleInputs} name="hoteltype">
                    <option selected>Hotels</option>
                    <option selected>Hostel</option>
                    <option>Vacation</option>
                </select>
            </div>
            <div className="col-md-4">
                <label for="contactNo" className="form-label">Contact No</label>
                <input type="number" className="form-control" name="contactNo" onChange= {handleInputs} id="contactNo" />
            </div>

            <div className="col-md-4">
                <label for="guest" className="form-label">Guest</label>
                <select id="guest" className="form-select" onChange= {handleInputs} name="guest">
                    <option selected>no guest</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

            <div className="col-md-4">
                <label for="rating" className="form-label">Rating</label>
                <select id="rating" className="form-select" onChange= {handleInputs} name="rating">
                    <option selected>no rating</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

            <div className="col-4">
            <label>CheckOut</label>
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            </div>
            
            <div className="col-4">
                <label>CheckIn</label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            
            
            <div className="col-4">
                <label for="formFile" className="form-label">Images Uploads</label>
                <input className="form-control" type="file"  name="formFile" onChange= {handleInputs} id="formFile" />
            </div>

            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                </div>
            </div>
            <div className="col-12">
                <input type="submit" className="form-submit" name="addhotel" id="addhotel" onClick={addhotelInf}/>
            </div>
        </form>
    )
}

export default AddHotel;