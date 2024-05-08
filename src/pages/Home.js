import "../styles/Home.css";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import Footer from "../components/Footer";
import BestDealscarausal from "./BestDeals";
import BannerCrausal from "./bannersCrausal"
export default function Home() {
  const CAROUSEL_DATA = {
    slides: [
      {
        src: '/images/slider1.webp',
        alt: "Image 1 for carousel",
        href: "/Men",
      },
      {
        src: '/images/slider2.webp',
        alt: "Image 2 for carousel",
        href: "/Men",
      },
      {
        src: '/images/slider3.webp',
        alt: "Image 3 for carousel",
        href: "/Men",
      },
      {
        src: '/images/slider4.webp',
        alt: "Image 4 for carousel",
        href: "/Women",
      },
      {
        src: '/images/slider5.webp',
        alt: "Image 5 for carousel",
        href: "/Women",
      },
      {
        src: '/images/slider6.webp',
        alt: "Image 6 for carousel",
        href: "/Women",
      },
    ],
  };
  const {getCategoryImage} = useUser();
  const [getcategory, setCategory] = useState([]);
  const navigate = useNavigate();
  const nevigateToProductCategory = (value) => {
    navigate(`/ProductList?category=${value}`);
  }
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
    <BannerCrausal data={CAROUSEL_DATA.slides} />
    </div>
      <div className='heading-home'>
        <h1>CATEGORIES</h1>
      </div>
      <div className="main-cart-container-home">
        {getcategory && getcategory.map((item, index) => (
          <div onClick={() => nevigateToProductCategory(item)} key={index} className='home-cart-container'>
            <img className="cart-img" src={getCategoryImage(item).categorySrc} />   
              <p className='description'>{item.toUpperCase()}</p>
          </div>
        ))
        }
        </div>
        <div className='heading-home'>
          <h1>BEST DEALS</h1>
        </div>
        {bestDeals ? (<BestDealscarausal deals={bestDeals} />):('')}
    </>
  )
}