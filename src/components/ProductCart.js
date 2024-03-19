import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import "../styles/ProductCart.css";
import { useUser } from '../providers/UserProvider';

export default function ProductCart() {

  const navigate = useNavigate();

  const { addToWhishList,cartItemToggle, setCartItemToggle,totalAmmount, setTotalAmmount,cartitem, setCartItem, cartItemCount, setCartItemCount } = useUser();

  const Cartlocation = useLocation();
  const cartSerchParams = new URLSearchParams(Cartlocation.search);
  let id = cartSerchParams.get("id");
  let size = cartSerchParams.get("size");
  let quantity = cartSerchParams.get("quantity");
  // console.log(cartitem);
  

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
      );console.log(cartItemCount);
      setCartItemCount(cartItemCount-1);
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
      setCartItemCount(0);
      
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
      <div className='main-addCart-container flex'>
        <div className='leftCart-container flex' >
        <div className='address-bar flex'>
        <span className='address-para '>Please select address..</span>
        <button className='address-btn' onClick={navigateToCart}>ADD</button>
      </div>
        <div className='prd-container flex'>
          {
            cartitem.map((item, index) => (
              <> <div className='subLeft flex'>
                <img className='addCart-img' src={item.product.displayImage} />
              
                <div className='subright flex'>
                  <p className='brand-name'>{item.product.name}</p>
                  <p className='price'>₹{item.product.price}</p>
                  <div className='qty-size flex'>
                  <span className='cart-size'>Size: {item.product.size}</span>
                  <span className='quantity'>Qty: {item.product.quantity}</span>
                  </div>
                  <div>
                    <div className='btns-del-add flex'>
                    <button onClick={() => deleteCartItems(item.product._id)} className='remove-del'>REMOVE</button>
                    <button onClick={() => { addToWhishList(item.product._id), deleteCartItems(item.product._id) }} 
                    className='remove-del' ><CiHeart /> MOVE TO WHISHLIST</button>
                    </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          }
          </div>
          <button className='clear-cart-btn' onClick={() => { clearCartItems() }} >CLEAR CART </button>

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
        <div className='main-rtg'>
        
          <div className='rightCart-container'>
          <div className='cont-btn flex'> 
          <button onClick={navigateToCart} className='order-btn'>PLACE ORDER</button></div>
          <p className='bill-heading'>BILLING DETAILS</p>
          
          <div className='bill-details'>
          <div className='ct flex'>
            <p>CART TOTAL</p>
            <p>{totalAmmount}</p>
          </div>
          <div className='ct flex'>
            <p>GST</p>
            <p>{(totalAmmount * 18) / 100}</p>
          </div>
          <div className='ct flex'>
            <p>TOTAL AMMOUNT</p>
            <p>{(totalAmmount + (totalAmmount * 18) / 100)}</p>
          </div>
          </div>
          <div className='cont-btn flex'> 
          <button onClick={navigateToCart} className='order-btn'>PLACE ORDER</button></div>
           
          </div>
        </div>
      </div>
    </div>
  )
}
