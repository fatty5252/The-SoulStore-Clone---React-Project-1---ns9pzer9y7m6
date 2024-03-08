import "../styles/Men.css";
import { useState, useEffect } from 'react';
import axios from 'axios';




export default function Men() {

  const [getData, setData] = useState([]);

  useEffect(()=>{
    mensList();
  },[])

  const mensList = async()=>{
    try {
      const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=50",{
        headers: {
          projectId: "rhxg8aczyt09"
        }
      });
      console.log(responce.data.data);
      setData(responce.data.data)
    }
    catch(err){
      console.log("Error shows ", err);
    }
  }

console.log("men component loaded");
  return (
    <>
    <div className='global-container'>
    <div className='container'>
      <img src='/images/banne1.webp'/>
      </div>
      <div className='heading'>
      <h1>CATEGORIES</h1>
      </div>
      <div className="main-cart-container">
    { getData.map((item,index)=>item.gender==="Men" && (
      <div key={index} className='cart-container'>
      <img className="cart-img" src={item.displayImage}/>
      <div className="p">
      <p className='description'>{item.description}</p>
      <p className='title'>{item.subCategory}</p>
      <p className="price">₹ {item.price}</p>
      </div>
     </div>
    ))
    }
    </div>  
    </div>
    </>
  )
}
