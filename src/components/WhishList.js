import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/WhishList.css";
import { useUser } from '../providers/UserProvider';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function WhishList() {
    const { setWishListCount, cartItemToggle, whishListItem, setWhishListItem, setwishListToggle, wishListToggle } = useUser();
    const navigate = useNavigate()
    // const { setWishListCount, cartItemToggle } = useUser();
    // const [wishListToggle, setwishListToggle] = useState(true);
    
    
    // const [whishListItem, setWhishListItem] = useState([]);
    // useEffect(() => {
    //     const fetchWhishListItems = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
    //                 {
    //                     headers: {
    //                         projectID: "rhxg8aczyt09",
    //                         Authorization: `Bearer ${localStorage.getItem("token")}`
    //                     }
    //                 }
    //             );
    //             if (response.data.status === "success") {
    //                 setWhishListItem(response.data.data.items)
    //                 setWishListCount(response.data.data.items.length);
    //                 // console.log(response.data.data.items.length);
    //                 localStorage.setItem("wishList", response.data.data.items.length)

    //             }
    //             // console.log(response);
    //         } catch (err) {
    //             console.log("Error shows ", err);
    //         }
    //     };
    //     fetchWhishListItems();
    // }, [wishListToggle, cartItemToggle]);

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
            // setWhishListItem(response.data.items);
            console.log(whishListItem);

        } catch (err) {
            console.log("Error shows ", err);
        }
    };


    return (
        <div >
            <div className='wish-heading'>
                <p>MY WISHLIST</p>
            </div>
            <hr></hr>
            <div className='main-wishList-container'>  

                {whishListItem && whishListItem.length > 0 ?
                    whishListItem.map((item, index) => (
                        <>
                        <div className='whishlist-items>'>
                         <div className='sub-container' >
                            <img className='wishCart-img' src={item.products.displayImage} />
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
                      {/* <div className="flexXY">{notrainsfound}</div> */}
                      <img src='https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png'/>
                      <h3>Your wishlist is lonely and looking for love.</h3>
                      <p>Add products to your wishlist, review them anytime and easily move to cart.</p>
                      <button onClick={()=>navigate('/')}>Continue shopping</button>
                    </div>
                  </div>
                }
            </div>
            <Footer/>
        </div>
    )
}
