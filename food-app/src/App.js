import './App.css';
import react, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
// import ServiceAdd from './components/hotel/addservice'
// import AddHotel from './components/hotel/addhotel'
import HotelDetails from './components/hotel/hoteldetails'
import Signup from './components/user/signup2';
import Login from './components/user/login2';
import Cart from './components/cart';


const Routing=()=>{
  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>} />  
        {/* <Route path="/addhotel" element={<AddHotel/>} />
        <Route path="/addservice" element={<ServiceAdd/>} /> */}
        <Route path="/restdetails/:id" element={<HotelDetails/>} />
        <Route path="/cartlist" element={<Cart/>} />

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        
        {/* <Route path="/home" element={<HomeRestaurant/>} /> */}
      </Routes>
    </>
  )
}

const App=()=> {
  const [login, setLogin]= useState("")

  useEffect(()=>{
    let userInf= localStorage.getItem('user')
    userInf= JSON.parse(userInf)
    setLogin(userInf)
}, [])  


  return (
    <>
    <div className="App">
      <Navbar login={login}/>
      <Routing/>
    </div>
    </>
  );
}

export default App;
