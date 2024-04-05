import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ProductDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useUser } from '../providers/UserProvider';
import { MdCancel } from 'react-icons/md';

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

  useEffect(() => {
    fetchIdDetails();git 
  }, [])

  const fetchIdDetails = async () => {
    try {
      const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`, {
        headers: {
          projectId: "rhxg8aczyt09"
        }
      });
      setProductDetails(responce.data.data)
      // console.log(responce.data.data);
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
      {toggleadd && <div class="alert alert-warning addedsuccessfully" role="alert">
        <p>Product added to cart succesfully.</p> <MdCancel onClick={()=>settoggleadd(false)}/>
      </div>}
      {togglewishlistpop && <div class="alert alert-warning addedsuccessfully" role="alert">
        <p>Product added to your wishlist.</p> <MdCancel onClick={()=>settogglewishlistpop(false)}/>
      </div>}
        <p className='name'>{productDetails.name}</p>
        <p className='category'>{productDetails.subCategory}</p>
        <hr></hr>
        <p className='brand bold'>Brand: {productDetails.brand}</p>
        <p className='price bold'>₹ {productDetails.price}</p>
        <p>Please select a size.</p>
        <div className='size-parent'>
          {productDetails && productDetails.size.map((itemSize, index) => (
            <p onClick={() => { selctSizeHandler(itemSize) }} key={index} className={`itemsize ${getSize == itemSize ? 'activSize' : ""}`}>{itemSize}</p>
          ))}
          {toggleSize && <p style={{ color: 'red' }}>Select the Size</p>}
        </div>
        <p className='color bold'>Color: {productDetails.color}</p>
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


      </div>
    </div>
  )
}

