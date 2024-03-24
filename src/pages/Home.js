import "../styles/Home.css";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import Footer from "../components/Footer";

export default function Home() {

  const {getCategoryImage} = useUser();

  const [getcategory, setCategory] = useState([]);
  const navigate = useNavigate();

  const nevigateToProductCategory = (value) => {
    navigate(`/ProductList?category=${value}`);
  }
  const nevigateToProductDetails = (value) => {
    navigate(`/ProductsDetails?id=${value}`);
  }

  const imgages =[
    "/images/Homepage-Banner_17.webp",
    "/images/banne1.webp",
    "/images/homepage_3.webp",
   " /images/web_4.webp",
   "/images/web_copy__2.webp"
  ]
  const [bestDeals, setBestDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products";
      const sortParam = { sort: '{"price": -1}' };
      const headers = { projectID: "rhxg8aczyt09" };

      try {
        const response = await fetch(`${baseUrl}?${new URLSearchParams(sortParam)}`, { headers });
        
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBestDeals(data.data);
        } else {
          console.error(`Failed to retrieve best deals. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []); 

  useEffect(() => {
    const mensCategory = async () => {

      try {
        const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories", {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        console.log(responce.data.data);
        setCategory(responce.data.data)
      }
      catch (err) {
        console.log("Error shows ", err);
      }
    }
    mensCategory();

  }, [])

  return (
    <>
    <div className="home-hero-img-container">
      <img className="home-hero-img" src="/images/Homepage-Banner_17.webp" alt="herobanner"/>
    </div>
      <div className='heading-home'>
        <h1>CATEGORIES</h1>
      </div>
      <div className="main-cart-container-home">
        {getcategory && getcategory.map((item, index) => (
          <div onClick={() => nevigateToProductCategory(item)} key={index} className='home-cart-container'>
            <img className="cart-img" src={getCategoryImage(item).categorySrc} />           
            {/* <div className="p"> */}
              <p className='description'>{item.toUpperCase()}</p>
            {/* </div> */}
          </div>
        ))
        }
        </div>
        <div className='heading-home'>
          <h1>BEST DEALS</h1>
        </div>
        <div className="bestDeals-container">
        <div className="bestDeals-cart-container-home bestdeals">
          {bestDeals.map((item, index) =>(
            <div onClick={() => nevigateToProductDetails(item._id)} key={index} 
            className='bestDeals-cart-container'>
              <img className="bestdeals-cart-img" src={item.displayImage} />
              <div className="p">
                <p className='para-description'>{item.name}</p>
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
