import "../styles/Men.css";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";


export default function ProductList() {

    const categoryLocation = useLocation();
    const searchParams = new URLSearchParams(categoryLocation.search);
    let category = searchParams.get("category");
    // console.log(category);

    const [products, setProduct] = useState([]);

    const navigate = useNavigate();

    
  useEffect(()=>{
    const fetchProducts = async () => {
    try {
        const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${category}"}`,{
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        // console.log(responce.data.data);
        setProduct(responce.data.data);
      }
      catch(err){
        console.log("Error shows ", err);
      }
    }
    fetchProducts();
  },[]);

  const nevigateToProductDetails=(value)=>{
    navigate(`/ProductsList?id=${value}`);
}

 

  return (
    <div className='main-cart-container' >
      {
      products.map(product => (
          <div onClick={()=>nevigateToProductDetails(product._id)} key={product._id
          } className="cart-container">
            <img className="cart-img" src={product.displayImage} alt={product.name} />
            <div className="p">
            <p className="name">{product.name}</p>
            <p className='title'>{product.subCategory}</p>
            <p className="price">{product.price}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
