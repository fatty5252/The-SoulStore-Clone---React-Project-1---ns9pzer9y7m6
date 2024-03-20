import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ProductDetails.css";
import { CiHeart } from "react-icons/ci";
import { useUser } from '../providers/UserProvider';

export default function ProductsDetails() {

  const { addToWhishList, setWishListCount, cartItemCount, setCartItemCount, setCartItemToggle, cartItemToggle } = useUser();

  const [getSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let id = searchParams.get("id");
  //  console.log(id);

  const [productDetails, setProductDetails] = useState('');
  const [toggleBtn, setToggleBtn] = useState(false);


  useEffect(() => {
    fetchIdDetails();
  }, [])

  const fetchIdDetails = async () => {
    try {
      const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`, {
        headers: {
          projectId: "rhxg8aczyt09"
        }
      });
      // console.log(responce.data.data);
      setProductDetails(responce.data.data)
      console.log(responce.data.data);
    }
    catch (err) {
      console.log("Error shows ", err);
    }
  }
  const selctSizeHandler = (size) => {
    setSize(size);
  }

  const selctQuantityHandler = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
  };
  // console.log(quantity);
  const navigate = useNavigate();

  const fetchToCartItems = async () => {

    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
        {
          "quantity": quantity,
          "size": getSize
        },
        {
          headers: {
            projectId: "rhxg8aczyt09",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }});

      if (response.data.status === "success"){
      setCartItemCount(response.data.data.items.length);
       console.log(response.data.data.items.length);
       localStorage.setItem("cartItem",response.data.data.items.length);
        setToggleBtn(!toggleBtn);
        setCartItemToggle(!cartItemToggle)
      }
      // console.log(response);
    } catch (err) {
     console.log("Error shows ", err);
    }
  }
  const navigateToCart = () => {
    navigate("/Men/ProductsDetails/ProductCart");
  }
  // console.log(id);
  return (

    <div className='main-container'>
      <div className='left-container'>
        {productDetails &&
          productDetails.images.map((itemImage, index) => (
            <img className='img-container' key={index} src={itemImage} />
          ))
        }

      </div>
      <div className='right-container'>
        <p className='name'>{productDetails.name}</p>
        <p className='category'>{productDetails.subCategory}</p>
        <hr></hr>
        <p className='brand bold'>Brand: {productDetails.brand}</p>
        <p className='price bold'>₹ {productDetails.price}</p>
        <p>Please select a size.</p>
        <div className='size-parent'>
          {productDetails && productDetails.size.map((itemSize, index) => (
            <p onClick={() => selctSizeHandler(itemSize)} key={index} className={`size ${getSize == itemSize ? 'activSize' : ""}`}>{itemSize}</p>
          ))}
        </div>
        <p className='color bold'>Color: {productDetails.color}</p>
        <p className='rating bold'>Ratings: {Math.round(productDetails.ratings)}/5</p>
        <div className='quantity bold'>Quantity &nbsp;
          <select onChange={(event) => selctQuantityHandler(event)} value={quantity} name='quantity'>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className='btn-container'>
        {!toggleBtn ? <button onClick={fetchToCartItems} className='cart-btn'>ADD TO CART</button>
         : <button onClick={navigateToCart} className='cart-btn'>GO TO CART</button> }
          <button onClick={() => {addToWhishList(productDetails._id)}} className='wish-btn'><CiHeart />ADD TO WISHLIST</button>
        </div>


      </div>
    </div>
  )
}

