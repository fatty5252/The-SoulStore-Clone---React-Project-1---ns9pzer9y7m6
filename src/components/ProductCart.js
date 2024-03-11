import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import "../styles/ProductCart.css";

export default function ProductCart() {

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
    const fetchCartItems = async () => {
      try {
        const response = await axios.patch(
          `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
          {
            "quantity": quantity,
            "size": size
          },
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
    fetchCartItems();
  }, []);

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
                </div>
                </div>
              </>
            ))
          }         
          <button className='add-whislist width-100'><CiHeart /> ADD FROM WISHLIST</button>
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
