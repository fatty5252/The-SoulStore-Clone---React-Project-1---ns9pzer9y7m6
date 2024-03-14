import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import "../styles/ProductCart.css";
import { useUser } from '../providers/UserProvider';

export default function ProductCart() {

  const navigate = useNavigate();

  const { addToWhishList,cartItemToggle, setCartItemToggle,totalAmmount, setTotalAmmount,cartitem, setCartItem, } = useUser();

  const Cartlocation = useLocation();
  const cartSerchParams = new URLSearchParams(Cartlocation.search);
  let id = cartSerchParams.get("id");
  let size = cartSerchParams.get("size");
  let quantity = cartSerchParams.get("quantity");
  console.log(cartitem);
  

  // Delet Item API

  const deleteCartItems = async (itemId) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${itemId}`,
        {
          headers: {
            projectId: "rhxg8aczyt09",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setCartItemToggle(!cartItemToggle);
      // console.log(response);
      //   setProductDetails(response.data.data)
    } catch (err) {
      console.log("Error shows ", err);
    }
  };

  // clear cart item
  const clearCartItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/`,
        {
          headers: {
            projectId: "rhxg8aczyt09",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setCartItemToggle(!cartItemToggle);
      // console.log(response);
      //   setProductDetails(response.data.data)
    } catch (err) {
      console.log("Error shows ", err);
    }
  };
  
  const navigateToCart = () => {
    navigate("/Address");
  }


  return (
    <div >
      <div className='heading'>
        <p>MY BAG ----------- ADDRESS ----------- PAYMENT</p>
      </div>
      <hr></hr>
      <div>
        <p>Please select address..</p>
        <button onClick={navigateToCart}>ADD</button>
      </div>
      <div className='main-addCart-container flex'>
        <div className='leftCart-container flex' >

          {
            cartitem.map((item, index) => (
              <> <div className='subLeft'>
                <img className='addCart-img' src={item.product.displayImage} />
              </div>
                <div className='subright'>
                  <p className='brand-name'>{item.product.name}</p>
                  <p className='price'>₹{item.product.price}</p>
                  <span className='size width-100'>Size: {item.product.size}</span>
                  <span className='quantity'>Qty: {item.product.quantity}</span>
                  <div>
                    <button onClick={() => deleteCartItems(item.product._id)} className='remove width-100'>REMOVE</button>
                    <button onClick={() => { addToWhishList(item.product._id), deleteCartItems(item.product._id) }} ><CiHeart /> MOVE TO WHISHLIST</button>
                  </div>
                </div>
              </>
            ))
          }
          <button onClick={() => { clearCartItems() }} >CLEAR CART </button>

        </div>

        {/* <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Apply Coupon
          </button>
          <br></br>
          <div class="dropdown-menu">
            <input class="dropdown-item" placeholder='Enter Code Here' />
            <span class="dropdown-item" >Apply</span>

          </div>
        </div> */}
        <div>
          <h2>BILLING DETAILS</h2>
          <div>
            <p>CART TOTAL</p>
            <p>{totalAmmount}</p>
          </div>
          <div>
            <p>GST</p>
            <p>{(totalAmmount * 18) / 100}</p>
          </div>
          <div>
            <p>TOTAL AMMOUNT</p>
            <p>{totalAmmount + (totalAmmount * 18) / 100}</p>
          </div>
          <div className='rightCart-container'>
            <button onClick={navigateToCart} className='order-btn width-100'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}
