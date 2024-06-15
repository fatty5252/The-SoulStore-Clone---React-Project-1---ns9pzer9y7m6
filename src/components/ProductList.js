import "../styles/ProductList.css";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Footer from "./Footer";
import { CiStar } from "react-icons/ci";
import { Pagination, Rating } from "@mui/material";
import ResponNav from "./ResponNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ProductList() {

  const { categoryToggle, setCategoryToggle, searchItem, setSearchItem } = useUser();
  // console.log(categoryToggle);

  const categoryLocation = useLocation();
  const searchParams = new URLSearchParams(categoryLocation.search);
  let category = searchParams.get("category");
  console.log(category);

  const [products, setProduct] = useState([]);

  const navigate = useNavigate();

  const [lowhigh, setlowhigh] = useState("");
  const [lowrating, setlowhighrating] = useState("");

  function sortingincreaseordecrease(value) {
    if (lowhigh == "") {
      return value;
    }
    else if (lowhigh == "hightolow") {
      return value.sort((a, b) => b.price - a.price);
    }
    else if (lowhigh == "lowtohigh") {
      return value.sort((a, b) => a.price - b.price);
    }
  }

  function sortinratinggincreaseordecrease(value) {
    if (lowrating == "") {
      return value;
    } else if (lowrating == "hightolowrating") {
      return value.sort((a, b) => b.ratings - a.ratings);
    } else if (lowrating == "lowtohighrating") {
      return value.sort((a, b) => a.ratings - b.ratings);
    }
  }

  function lowhighchanger(val) {
    if (val == lowhigh) {
      setlowhigh("")
    }
    else {
      setlowhighrating("")
      setlowhigh(val);
    }
  }

  function lowhighratingchanger(val) {
    if (val == lowrating) {
      setlowhighrating("")
    }
    else {
      setlowhigh("")
      setlowhighrating(val);
    }
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchItem) {
          const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${searchItem}"}`, {
            headers: {
              projectId: "rhxg8aczyt09"
            }
          });
          console.log(responce.data.data);
          setProduct(sortingincreaseordecrease(responce.data.data));
          setProduct(sortinratinggincreaseordecrease(responce.data.data));
        }
        else {
          const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${category}","gender":"${localStorage.getItem("GENDER")}"}`, {
            headers: {
              projectId: "rhxg8aczyt09"
            }
          });
          console.log(responce.data.data);
          setProduct(sortingincreaseordecrease(responce.data.data));
          setProduct(sortinratinggincreaseordecrease(responce.data.data));
        }

      }
      catch (err) {
        console.log("Error shows ", err);
        if (!searchItem) {
          toast(`This Product is not available ${localStorage.getItem("GENDER")}`);       
        }
      }
    }
    fetchProducts();
  }, [categoryToggle, lowhigh, lowrating, category]);

  // for filter Sidebar=====================================================================

  // useEffect(()=>{
  //   const filterProducts = async () => {
  //   try {
  //       const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${category}"}?{"gender:"${gender}"?{}}`,{
  //         headers: {
  //           projectId: "rhxg8aczyt09"
  //         }
  //       });
  //       // console.log(responce.data.data);
  //       setProduct(responce.data.data);
  //     }
  //     catch(err){
  //       console.log("Error shows ", err);
  //     }
  //   }
  //   filterProducts();
  // },[categoryToggle]);

  const nevigateToProductDetails = (value) => {
    navigate(`/ProductList/ProductsDetails?id=${value}`);
  }

  return (
    <>
      <div className="list-main">
        <div className="listsort-sec">
        <ToastContainer position="top-center" />
          <div className="pricesort-sec">
            <h5>Sort by price</h5>
            <div className="flex" onClick={() => lowhighchanger('hightolow')}>
              <input className="price-input" name="hightolow" type="radio" />
              <label htmlFor="hightolow" className="price-label">high to low</label>
            </div>
            <div className="flex" onClick={() => lowhighchanger('lowtohigh')}>
              <input className="price-input" name="hightolow" type="radio" />
              <label htmlFor="hightolow" className="price-label">low to high</label>
            </div>
          </div>
          <div className="ratingsort-sec">
            <h5>Sort by rating</h5>
            {/* <button onClick={() => lowhighratingchanger('hightolowrating')}>high rating</button>
            <button onClick={() => lowhighratingchanger('lowtohighrating')}>low rating</button> */}
            <div className="flex" onClick={() => lowhighratingchanger('hightolowrating')}>
              <input className="price-input" name="hightolowrating" type="radio" />
              <label htmlFor="hightolowrating" className="price-label">high to low Rating</label>
            </div>
            <div className="flex" onClick={() => lowhighratingchanger('lowtohighrating')}>
              <input className="price-input" name="hightolowrating" type="radio" />
              <label htmlFor="hightolowrating" className="price-label">low to high Rating</label>
            </div>
          </div>
        </div>
        <div className='main-cart-container' >

          {
            products.map(product => (
              <div onClick={() => nevigateToProductDetails(product._id)} key={product._id
              } className="list-cart-container">
                <img className="cart-img" src={product.displayImage} alt={product.name} />
                <div className="list-details">
                  <p className="listName">{product.name}</p>
                  <p className="listbrand">{product.brand}</p>
                  {/* <div className="flex"> */}
                    <p className='title'>{product.subCategory}</p>
                    <Rating name="read-only" value={product.ratings} readOnly />
                    {/* <div className="flexXY"><p><CiStar /></p><p className="price"> {Math.round(product.ratings)}/5</p></div> */}
                  {/* </div> */}
                  <div className="flex">
                    <p className="price">₹ {product.price}</p>
                    <p className="price-cut">₹ {product.price + 100}</p>
                  </div>
                </div>
              </div>
            ))}
        {/* <Pagination count={10} variant="outlined" color="primary" /> */}
        </div>
      </div>
    </>
  )
}
