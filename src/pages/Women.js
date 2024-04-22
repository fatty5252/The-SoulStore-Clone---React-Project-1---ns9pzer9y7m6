import "../styles/Women.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Footer from "../components/Footer";
import BannerCrausal from "./bannersCrausal"



export default function Women() {

  const CAROUSEL_DATA = {
    slides: [
      {
        src: '/images/slider1.webp',
        alt: "Image 1 for carousel",
        href: "/subCategory/audio",
      },
      {
        src: '/images/slider2.webp',
        alt: "Image 2 for carousel",
        href: "/subCategory/refrigerator",
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
        src: '/images/slider5.webp',
        alt: "Image 5 for carousel",
        href: "/subCategory/refrigerator",
      },
      {
        src: '/images/slider6.webp',
        alt: "Image 6 for carousel",
        href: "/subCategory/mobile",
      },
    ],
  };

  const { searchItem, setSearchItem } = useUser();
  const [getData, setData] = useState([]);

  useEffect(() => {
    WomenList();
  }, [searchItem])

  const WomenList = async () => {
    try {
      if (searchItem) {
      const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"subCategory":"${searchItem}"}&limit=100`, {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        setData(responce.data.data)
      } else {
        const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"Women","subCategory":"shirt"}&limit=100`, {
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
    navigate(`/Women/ProductsDetails?id=${value}`);
  }

  // console.log("men component loaded");
  return (
    <>
      <div>
        {/* <div className="women-container-main">
          <img className='women-container' src='/images/web_copy_2.webp' />
        </div> */}
         <BannerCrausal data={CAROUSEL_DATA.slides} />
        <div className='heading'>
          <h1>PRODUCTS</h1>
        </div>
        <div className="women-cart-container">
          {getData.map((item, index) => item.gender === "Women" && (
            <div onClick={() => nevigateToProductDetails(item._id)} key={index} className='cart-container-women'>
              <img className="cart-img" src={item.displayImage} />
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
      <Footer />
    </>
  )
}
