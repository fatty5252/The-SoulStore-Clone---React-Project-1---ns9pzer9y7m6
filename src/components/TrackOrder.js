import axios from 'axios'
import React, { useState } from 'react'
import "../styles/TrackOrder.css"
import Footer from './Footer';

export default function TrackOrder() {

    // ======================== for Single Product fetching API==============================

    const [getData,setData] =useState("");

    const TrackOrder = async () => {
       
        try {
            const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/order/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        projectID: "rhxg8aczyt09"
                    }
                });
                setData(responce.data);
        }
        catch (err) {
            console.log("Error shows ", err)
        }
    }

    return (
        <div>
       <div className='toTopBox'>
       Hey! Please note that The Souled Store team will never ask you to disclose any financial information or for payment regarding any contest. For COD orders we do not collect money before the order delivery. Do not share any such sensitive details. Stay secure and stay safe.
       </div>
       <div className='orderHeading'>MY ORDERS</div>
       <Footer/>
        </div>     
    )
}
