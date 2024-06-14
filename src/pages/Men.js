import "../styles/Men.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Footer from "../components/Footer";
import BannerCrausal from "./bannersCrausal";
import { CiStar } from "react-icons/ci";
import { Rating } from "@mui/material";


export default function Men() {


  const CAROUSEL_DATA = {
    slides: [
      {
        src: '/images/menslider9.webp',
        alt: "Image 1 for carousel",
        href: '/images/menslider9.webp',
      },
      {
        src: '/images/menslider11.webp',
        alt: "Image 2 for carousel",
        href: '/images/menslider11.webp',
      },
      {
        src: '/images/slider3.webp',
        alt: "Image 3 for carousel",
        href: "/subCategory/kitchenappliances",
      },
      {
        src: '/images/slider4.webp',
        alt: "Image 4 for carousel",
        href: "/subCategory/audio",
      },
      {
        src: '/images/slider1.webp',
        alt: "Image 5 for carousel",
        href: '/images/slider1.webp',
      },
      {
        src: '/images/slider2.webp',
        alt: "Image 6 for carousel",
        href: '/images/slider2.webp',
      },
    ],
  };

const [getData, setData] = useState([]);
const {searchItem, setSearchItem} = useUser();


  useEffect(() => {
    mensList();
  }, [searchItem])

  const mensList = async () => {
    try {
      if (searchItem) {
      const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"subCategory":"${searchItem}"}&limit=100`, {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        setData(responce.data.data)
      } else {
        const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"Men","subCategory":"shirt"}&limit=100`, {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        setData(responce.data.data)
      }
      // console.log(responce.data.data);
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
        {/* <div className='hero-container' >
          <img className="hero-img" src='/images/banne1.webp' />
        </div> */}
         <BannerCrausal data={CAROUSEL_DATA.slides} />
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
                    <Rating name="read-only" value={item.ratings} readOnly />
                {/* <p className='title'>{item.sellerTag}</p> */}
                <div className="flex">
                <p className="price">₹ {item.price}</p>
                <p className="price-cut">₹ {item.price + 100}</p>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </>
  )
}
