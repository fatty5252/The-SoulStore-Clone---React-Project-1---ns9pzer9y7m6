import "../styles/Men.css";
import { useState, useEffect } from 'react';
import axios from 'axios';




export default function Women() {

  const [getData, setData] = useState([]);

  useEffect(()=>{
    mensList();
  },[])

  const mensList = async()=>{
    try {
      const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=100",{
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
    <div>
    <div>
      <img className='container' src='/images/web_copy_2.webp'/>
      </div>
      <div className='heading'>
      <h1>CATEGORIES</h1>
      </div>
      <div className="main-cart-container">
    { getData.map((item,index)=>item.gender==="Women" && (
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
