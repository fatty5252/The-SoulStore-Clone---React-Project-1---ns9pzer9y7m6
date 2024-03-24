import "../styles/ProductList.css";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import Footer from "./Footer";


export default function ProductList() {

  const { categoryToggle, setCategoryToggle } = useUser();
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
      setlowhigh(val);
    }
  }

  function lowhighratingchanger(val) {
    if (val == lowrating) {
      setlowhighrating("")
    }
    else {
      setlowhighrating(val);
    }
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${category}"}`, {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        console.log(responce.data.data);
        setProduct(sortingincreaseordecrease(responce.data.data));
        setProduct(sortinratinggincreaseordecrease(responce.data.data));

      }
      catch (err) {
        console.log("Error shows ", err);
      }
    }
    fetchProducts();
  }, [categoryToggle, lowhigh, lowrating]);

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
                <div className="p">
                  <p className="price"> {Math.floor(product.ratings)}</p>
                  <p className="listName">{product.name}</p>
                  <p className='title'>{product.subCategory}</p>
                  <p className="price">₹ {product.price}</p>

                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
