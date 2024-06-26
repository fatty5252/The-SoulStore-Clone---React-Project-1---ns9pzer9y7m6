import "../styles/App.css";
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Men from "../pages/Men";
import Navbar from './Navbar'
import Women from "../pages/Women";
import Login from "./Login";
import ProductsDetails from "../pages/ProductsDetails";
import Home from "../pages/Home";
import ProductCart from "./ProductCart";
import ProductList from "./ProductList";
import BestDeal from "./BestDeal";
import { UserProvider } from "../providers/UserProvider";
import WhishList from "./WhishList";
import Address from "./Address";
import CheckOut from "./CheckOut";
import ComingSoon from "./ComingSoon";
import TrackOrder from "./TrackOrder";
import SuccessPayment from "../pages/SuccessPayment";
import Footer from "./Footer";
import ResponNav from "./ResponNav"


function App() {
  // return <div className="App">App</div>;
  return (
    <div>
    <UserProvider>
      <BrowserRouter>
      
      <Navbar/>
      <Outlet/>        
       <Routes>  
        <Route path="/Login" element={<Login/>}/>                   
        <Route index element={<Home/>}/> 
        <Route path="/" element={<Home/>}/> 
        <Route path='/Men' element={<Men/>}/>  
        <Route path="/Women" element={<Women/>}/>
        <Route path="/ProductList" element={<ProductList/>}/>
        <Route path="/BestDeal" element={<BestDeal/>}/>
        <Route path="/WhishList" element={<WhishList/>}/>
        <Route path="/Women/:ProductsDetails" element={<ProductsDetails/>}/>
        <Route path="/Men/:ProductsDetails" element={<ProductsDetails/>}/>
        <Route path="/:ProductsDetails" element={<ProductsDetails/>}/>
        <Route path="/ProductList" element={<ProductList/>}/>
        <Route path="/ProductList/:ProductsDetails" element={<ProductsDetails/>}/>
        <Route path="/WhishList/:ProductsDetails" element={<ProductsDetails/>}/>
        <Route path="/Men/ProductsDetails/ProductCart" element={<ProductCart/>}/>
        <Route path="/ProductCart" element={<ProductCart/>}/>
        <Route path="/Address" element={<Address/>}/>
        <Route path="TrackOrder" element={<TrackOrder/>}/>
        <Route path="/Checkout" element={<CheckOut/>}/>
        <Route path="/ComingSoon" element={<ComingSoon/>}/>
        <Route path='/SuccessPayment' element={<SuccessPayment/>}/>
        <Route path='/ResponNav' element={<ResponNav/>}/>
       </Routes>   
       <Footer/>  
             
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
