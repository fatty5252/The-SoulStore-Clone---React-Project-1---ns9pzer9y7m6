import "../styles/App.css";

import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Men from "../pages/Men";
import Navbar from './Navbar'
import Women from "../pages/Women";



function App() {
  // return <div className="App">App</div>;
  return (
    <div>
      <BrowserRouter>     
       <Navbar/>
       <Routes>
        <Route path="/" element={<Men/>}/>  
        <Route path="/Men" element={<Men/>}/>  
        <Route path="/Women" element={<Women/>}/>  
       </Routes>          
      </BrowserRouter>
    </div>
  );
}

export default App;
