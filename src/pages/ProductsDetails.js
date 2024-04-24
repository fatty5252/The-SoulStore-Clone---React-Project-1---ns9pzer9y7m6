import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ProductDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useUser } from '../providers/UserProvider';
import { MdCancel } from 'react-icons/md';
import { Rating } from '@mui/material';



export default function ProductsDetails() {

  const { addToWhishList, setWishListCount, cartItemCount, setCartItemCount, setCartItemToggle, cartItemToggle, toggleheart, settoggleheart, togglewishlistpop, settogglewishlistpop } = useUser();

  const [getSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [toggleSize, settoggleSize] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let id = searchParams.get("id");

  const [productDetails, setProductDetails] = useState('');
  const [toggleBtn, setToggleBtn] = useState(false);
  const [toggleadd, settoggleadd] = useState(false)

  const [desc, setdes] = useState([])

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
      setProductDetails(responce.data.data)
      console.log(responce);
    }
    catch (err) {
      console.log("Error shows ", err);
    }
  }
  const selctSizeHandler = (size) => {
    setSize(size);
    settoggleSize(false)
  }

  const selctQuantityHandler = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
  };
  const navigate = useNavigate();

  const fetchToCartItems = async () => {
    if (getSize && quantity) {
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
            }
          });

        if (response.data.status === "success") {
          setCartItemCount(cartItemCount + 1);
          //  console.log(response.data.data.items.length);
          setToggleBtn(!toggleBtn);
          setCartItemToggle(!cartItemToggle)
          settoggleSize(false)
          settoggleadd(!toggleadd)
        }
        // console.log(response);
      } catch (err) {
        console.log("Error shows ", err);
      }
    } else if (getSize === '') {
      settoggleSize(!toggleSize)
    }
  }
  const navigateToCart = () => {
    navigate("/Men/ProductsDetails/ProductCart");
  }


  const removeBTags = () => {
    const description = productDetails.description && productDetails.description.split('<br>');

    const cleanedParts = description && description.map(part => part.replace(/<\/?b[^>]*>/g, ''));
    setdes(cleanedParts)
    console.log(cleanedParts)

    // return cleanedParts;
  };

  useEffect(() => {
    removeBTags()
  }, [productDetails.description, productDetails])

  // const separatedText = removeBTags(productDetails.description && productDetails.description);

  // Log the cleaned array of separated text
  // console.log(separatedText);

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
        {toggleadd && <div style={{ background: "green", color: "white" }} class="alert alert-warning addedsuccessfully" role="alert">
          <p>Product added to cart succesfully.</p> <MdCancel onClick={() => settoggleadd(false)} />
        </div>}
        {togglewishlistpop && <div style={{ background: "green", color: "white" }} class="alert alert-warning addedsuccessfully" role="alert">
          <p>Product added to your wishlist.</p> <MdCancel onClick={() => settogglewishlistpop(false)} />
        </div>}
        <p className='name'>{productDetails.name}</p>
        <p className='category'>{productDetails.subCategory}</p>
        <hr></hr>
        <p className='brand bold'>Brand: {productDetails.brand}</p>
        <p className='price bold'>₹ {productDetails.price}</p>
        <p>MRP incl. of all taxes</p>
        <p>Please select a size.</p>
        <div className='size-parent'>
          {productDetails && productDetails.size.map((itemSize, index) => (
            <p onClick={() => { selctSizeHandler(itemSize) }} key={index} className={`itemsize ${getSize == itemSize ? 'activSize' : ""}`}>{itemSize}</p>
          ))}
          {toggleSize && <p style={{ color: 'white', background: "red", borderRadius: "3px" }}>Please select the Size!</p>}
        </div>
        <p className='color bold'>Color: {productDetails.color}</p>
        {/* <Rating name="read-only" value={productDetails.ratings} readOnly /> */}
        <p className='rating bold'>Ratings: {Math.round(productDetails.ratings)}/5</p>
        <div className='quantity bold'>Quantity &nbsp;
          <select onChange={(event) => { selctQuantityHandler(event) }} value={quantity} name='quantity'>
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
          {!toggleBtn ? <button onClick={() => { fetchToCartItems() }} className='cart-btn'>ADD TO CART</button>
            : <button onClick={navigateToCart} className='cart-btn'>GO TO CART</button>}
          <button onClick={() => { addToWhishList(productDetails._id) }} className='wish-btn'>{!toggleheart ? <CiHeart /> : <FaHeart />}ADD TO WISHLIST</button>
        </div>
        
        <div className='return-policy'>
        <img data-v-9294f528="" data-src="https://tss-static-images.gumlet.io/icons/return-icon.png" width="27" height="27" alt="Return Policy" class="return-icon-pdp img-auto gm-observing gm-observing-cb" src="https://tss-static-images.gumlet.io/icons/return-icon.png"/>
          Return Policy
          This product is eligible for return or exchange under our 30-day return or exchange policy. No questions asked.</div>
        <div className='product-description-main'>
          <p>Product Details:</p>
          <div className='product-description'>
            {desc && desc[0]}
          </div>
          <div className='product-description'>
            {desc && desc[1]}
          </div>
          <div className='product-description'>
            {desc && desc[3]}
          </div>
          <div className='product-description'>
            {desc && desc[5]}
          </div>
          <div className='product-description'>
            {desc && desc[7]}
          </div>
        </div>
      </div>
    </div>
  )
}

