import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../../App.css'
import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCircleArrowLeft,
//   faCircleArrowRight,
//   faCircleXmark,
//   faLocationDot,
// } from "@fortawesome/free-solid-svg-icons";
import "./hotel.css";
import { photos } from "../../images/images"
// import images from "../../images.jpeg"

const FoodItemDetails = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  //   const [openModel, setOpenModel] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  console.log("id", id)

  //   const handleClick = () => {
  //     if (id) {
  //       setOpenModel(true)
  //     } else {
  //       navigate('/login')
  //     }
  //   }


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hotelList, setHotelList] = useState([])
  const [findhotel, setFindhotel] = useState([])
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(null)

  const hotelDetails = async () => {
    const response = await axios.get(`/servicedetails/${id}`);
    console.log("aijaj", response)
    // setHotelList(...hotelList, response)
    setFindhotel(response.data.data)
    return response
  }

  useEffect(() => {
    hotelDetails()
  }, [])


  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };



  return (
    <>
      <h1> Food Item details</h1>

      {/* <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{findhotel.hotelName}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{findhotel.address}</span>
          </div>
          <span className="hotelDistance">
            {findhotel.distance}
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${findhotel.price} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={findhotel.images}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{findhotel.title}</h1>
              <p className="hotelDesc">
                {findhotel.description}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a "days"-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * findhotel.price * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div> */}

      {console.log("findhotel", findhotel)}
      {findhotel?.map((rest => {
        { console.log("aijaj2", rest) }
        <div className="row row-cols-2 row.d-flex row-cols-md-4 g-4">
          <div className="col-10 d-flex justify-content-center">
            <div className="card" style={{ width: "35rem", borderRadius: "20px" }}>
              <img className="card-img-top" src="https://media.istockphoto.com/photos/fresh-fruits-on-wooden-table-picture-id501706215?s=612x612" alt="Card image cap" />
              <div className="card-body">
                <h1 className="card-title">{rest.foodName}</h1>
                <p className="card-text">{`foodType: ${rest.foodType}`}</p>
                <p className="card-text">{`takeTime: ${rest.takeTime}`}</p>
                <p className="card-text">{`price: ${rest.price}`}</p>
                <p className="card-text">{`rating: ${rest.restId.rating}`}</p>
                <p className="card-text">{`address: ${rest.restId.address}`}</p>
                <p className="card-text">{`city: ${rest.restId.city}`}</p>
                <p className="card-text">{`contactNo: ${rest.restId.contactNo}`}</p>
                <p className="card-text">{`restName: ${rest.restId.restName}`}</p>
                <p className="card-text">{`state: ${rest.restId.state}`}</p>
                <p className="card-text">{`description: ${rest.restId.description}`}</p>
                {/* <button onClick="{handleClick}">Reserve or Book Now!</button> */}
              </div>
            </div>
          </div>
        </div>
      }))
      }
    </>
  )
}

export default FoodItemDetails;