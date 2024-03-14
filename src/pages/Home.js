import "../styles/Men.css";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';

export default function Home() {

  const {getCategoryImage} = useUser();

  const [getcategory, setCategory] = useState([]);
  const navigate = useNavigate();

  const nevigateToProductCategory = (value) => {
    navigate(`/ProductCategory?category=${value}`);
  }

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
      <div className='heading'>
        <h1>CATEGORIES</h1>
      </div>
      <div className="main-cart-container">
        {getcategory && getcategory.map((item, index) => (
          <div onClick={() => nevigateToProductCategory(item)} key={index} className='cart-container'>
            <img className="cart-img" src={getCategoryImage(item).categorySrc} />           
            {/* <div className="p"> */}
              <p className='description'>{item.toUpperCase()}</p>
            {/* </div> */}
          </div>
        ))
        }
      </div>
    </>
  )
}
