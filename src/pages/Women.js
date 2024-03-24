import "../styles/Women.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Footer from "../components/Footer";




export default function Women() {

const {searchItem, setSearchItem} = useUser();
  const [getData, setData] = useState([]);

  useEffect(()=>{
    mensList();
  },[searchItem])

  const mensList = async()=>{
    try {
      const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"subCategory":"${searchItem}"}&limit=100`,{
        headers: {
          projectId: "rhxg8aczyt09"
        }
      });
      // console.log(responce.data.data);
      setData(responce.data.data)
    }
    catch(err){
      console.log("Error shows ", err);
    }
  }

  const navigate = useNavigate();

  const nevigateToProductDetails=(value)=>{
       navigate(`/Women/ProductsDetails?id=${value}`);
  }

// console.log("men component loaded");
  return (
    <>
    <div>
    <div className="women-container-main">
      <img className='women-container' src='/images/web_copy_2.webp'/>
      </div>
      <div className='heading'>
      <h1>PRODUCTS</h1>
      </div>
      <div className="women-cart-container">
    { getData.map((item,index)=>item.gender==="Women" && (
      <div onClick={()=>nevigateToProductDetails(item._id)} key={index} className='cart-container-women'>
      <img className="cart-img" src={item.displayImage}/>
      <div className="p">
      <p className='para-description'>{item.description}</p>
      <p className='title'>{item.subCategory}</p>
      <p className="price">₹ {item.price}</p>
      </div>
     </div>
    ))
    }
    </div>  
    </div>
    <Footer/>
    </>
  )
}
