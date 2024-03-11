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



function App() {
  // return <div className="App">App</div>;
  return (
    <div>
    
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
        <Route path="/Men/:ProductsDetails" element={<ProductsDetails/>}/>
        <Route path="/Men/ProductsDetails/:ProductCart" element={<ProductCart/>}/>
       </Routes>              
      </BrowserRouter>
    </div>
  );
}

export default App;
