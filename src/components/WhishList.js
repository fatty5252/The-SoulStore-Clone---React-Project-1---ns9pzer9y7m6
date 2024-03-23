import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/WhishList.css";
import { useUser } from '../providers/UserProvider';
import Footer from './Footer';

export default function WhishList() {

    const { setWishListCount, cartItemToggle } = useUser();

    const [whishListItem, setWhishListItem] = useState([]);
    const [wishListToggle, setwishListToggle] = useState(true);


    useEffect(() => {
        const fetchWhishListItems = async () => {
            try {
                const response = await axios.get(
                    `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
                    {
                        headers: {
                            projectID: "rhxg8aczyt09",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                if (response.data.status === "success") {
                    setWhishListItem(response.data.data.items)
                    setWishListCount(response.data.data.items.length);
                    // console.log(response.data.data.items.length);
                    localStorage.setItem("wishList", response.data.data.items.length)

                }
                // console.log(response);
            } catch (err) {
                console.log("Error shows ", err);
            }
        };
        fetchWhishListItems();
    }, [wishListToggle, cartItemToggle]);

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

                {whishListItem &&
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
                }
            </div>
            <Footer/>
        </div>
    )
}
