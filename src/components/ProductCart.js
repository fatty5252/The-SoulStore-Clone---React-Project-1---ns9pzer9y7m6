import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import "../styles/ProductCart.css";
import { useUser } from '../providers/UserProvider';

export default function ProductCart() {

  const {addToWhishList} = useUser();

  const Cartlocation = useLocation();
  const cartSerchParams = new URLSearchParams(Cartlocation.search);
  let id = cartSerchParams.get("id");
  let size = cartSerchParams.get("size");
  let quantity = cartSerchParams.get("quantity");
  // console.log(size);
  // console.log(quantity);

  const [cartitem, setCartItem] = useState([]);
  const [cartItemToggle, setCartItemToggle] = useState(true);

  useEffect(() => { 
    fetchCartItems();
  }, [cartItemToggle]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/cart",
        {
          headers: {
            projectId: "rhxg8aczyt09",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setCartItem(response.data.data.items);
      console.log(response);
      //   setProductDetails(response.data.data)
    } catch (err) {
      console.log("Error shows ", err);
    }
  };

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


  
  return (
    <div >
      <div className='heading'>
        <p>MY BAG ----------- ADDRESS ----------- PAYMENT</p>
      </div>
      <hr></hr>
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
                <button onClick={()=>deleteCartItems(item.product._id)} className='remove width-100'>REMOVE</button>
                <button onClick={()=>{addToWhishList(item.product._id), deleteCartItems(item.product._id)}} ><CiHeart /> MOVE TO WHISHLIST</button>
                </div>
                </div>
              </>
            ))
          }         
          
        </div>
        <div className='rightCart-container'>
          <button className='order-btn width-100'>PLACE ORDER</button>
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
      </div>
    </div>
  )
}
