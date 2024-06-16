import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/WhishList.css";
import { useUser } from '../providers/UserProvider';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WhishList() {
    const { setWishListCount, cartItemToggle, whishListItem, setWhishListItem, setwishListToggle, wishListToggle, checkIfInWishlist } = useUser();

    // console.log('whishListItem----------->', whishListItem);

    const navigate = useNavigate()
    
    const deletWhishListItems = async (id) => {
        try {
            const response = await axios.delete(
                `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`,
                {
                    headers: {
                        projectID: "rhxg8aczyt09",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setwishListToggle(!wishListToggle);
            toast.success("Product Remove From Wishlist!");
            // setWhishListItem(response.data.items);

        } catch (err) {
            console.log("Error shows ", err);
        }
    };
     const nevigateToProductDetails = (value) => {
    navigate(`/WhishList/ProductsDetails?id=${value}`);
  }

    return (
        <div >
            <div className='wish-heading'>
        <ToastContainer position="top-right" />
                <p>MY WISHLIST</p>
            </div>
            <hr></hr>
            <div className='main-wishList-container'>  

                {whishListItem && whishListItem.length > 0 ?
                    whishListItem.map((item, index) => (
                        <>
                        <div key={index} className='whishlist-items>'>
                         <div className='sub-container' >
                            <img onClick={()=>{nevigateToProductDetails(item.products._id)}} className='wishCart-img' src={item.products.displayImage} />
                            </div>
                            <div className='sub-container-items'>
                            <p className='brand-name'>{item.products.name}</p>
                            <p className='price'>₹{item.products.price}</p>
                            </div>
                            <div className='wish-del-btn'>
                                <button className='del-btn' onClick={() => deletWhishListItems(item.products._id)}
                                    >REMOVE FROM WISHLIST</button>
                            </div>
                            </div>
                        </>
                    ))
                    :
                    <div className="wishlistprod">
                    <div>
                      <img src='https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png'/>
                      <h3>Your wishlist is lonely and looking for love.</h3>
                      <p>Add products to your wishlist, review them anytime and easily move to cart.</p>
                      <button onClick={()=>navigate('/')}>Continue shopping</button>
                    </div>
                  </div>
                }
            </div>
        </div>
    )
}
