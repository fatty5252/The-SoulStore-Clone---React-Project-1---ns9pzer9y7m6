import "../styles/Men.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Footer from "../components/Footer";




export default function Men() {

const [getData, setData] = useState([]);
const {searchItem, setSearchItem} = useUser();


  useEffect(() => {
    mensList();
  }, [searchItem])

  const mensList = async () => {
    try {
      const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"subCategory":"${searchItem}"}&limit=50`, {
        headers: {
          projectId: "rhxg8aczyt09"
        }
      });
      // console.log(responce.data.data);
      setData(responce.data.data)
    }
    catch (err) {
      console.log("Error shows ", err);
    }
  }

  const navigate = useNavigate();

  const nevigateToProductDetails = (value) => {
    navigate(`/Men/ProductsDetails?id=${value}`);
  }

  // console.log("men component loaded");
  return (
    <>
      <div className='men-container'>
        <div className='hero-container' >
          <img className="hero-img" src='/images/banne1.webp' />
        </div>
        <div className='men-heading'>
          <h1>PRODUCTS</h1>
        </div>
        <div className="main-cart-container-men">
          {getData.map((item, index) => item.gender === "Men" && (
            <div onClick={() => nevigateToProductDetails(item._id)} key={index} className='cart-container-men'>
              <img className="cart-img" src={item.displayImage} />
              <div className="p">
                <p className='para-description'>{item.description}</p>
                <p className='title'>{item.subCategory}</p>
                {/* <p className='title'>{item.sellerTag}</p> */}
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
