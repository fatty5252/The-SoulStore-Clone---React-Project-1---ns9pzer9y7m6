import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../styles/TrackOrder.css"
import Footer from './Footer';

export default function TrackOrder() {

    // ======================== for List Product fetching API==============================

    const [getData,setData] =useState("");

    useEffect(()=>{
        TrackOrder();
    },[])

    const TrackOrder = async () => {
       
        try {
            const responce = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/order/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        projectID: "rhxg8aczyt09"
                    }
                });
                setData(responce.data.data);
                console.log(responce.data.data);
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
       {getData && getData.map((item, index)=>(
        <div key={index}>
            <p>{item.order.items[0].product.name}</p>
            <p>{item.order.items[0].product.price}</p>
            {item.order.items.map((image, index)=>(
                <img key={index} src={image.product.displayImage}/>
            ))}

            <p>{item.order.shipmentDetails.address.street}, {item.order.shipmentDetails.address.city}, {item.order.shipmentDetails.address.state}, {item.order.shipmentDetails.address.country}</p>

        </div>
       ))}
       <Footer/>
        </div>     
    )
}
