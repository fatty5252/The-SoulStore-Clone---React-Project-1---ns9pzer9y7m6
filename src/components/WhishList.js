import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/ProductCart.css";
import { useUser } from '../providers/UserProvider';

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
                if (response.data.status === "success"){
                    setWhishListItem(response.data.data.items)
                    setWishListCount(response.data.data.items.length);
                    // console.log(response.data.data.items.length);
                    localStorage.setItem("wishList",response.data.data.items.length)
                    
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
            <div className='heading'>
                <p>MY BAG ----------- ADDRESS ----------- PAYMENT</p>
            </div>
            <hr></hr>
            <div className='main-addCart-container flex'>
                <div className='leftCart-container flex' >

                    {whishListItem &&
                        whishListItem.map((item, index) => (
                            <> <div className='subLeft'>
                                <img className='addCart-img' src={item.products.displayImage} />
                            </div>
                                <div className='subright'>
                                    <p className='brand-name'>{item.products.name}</p>
                                    <p className='price'>₹{item.products.price}</p>
                                    <div>
                                    <button onClick={()=>deletWhishListItems(item.products._id)} className='order-btn width-100'>REMOVE FROM WISHLIST</button>
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
