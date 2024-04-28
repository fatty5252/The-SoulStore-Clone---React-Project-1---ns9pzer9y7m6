import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../styles/TrackOrder.css"
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import ResponNav from "./ResponNav";


export default function TrackOrder() {

    // ======================== for List Product fetching API for TrackOrders==============================

    const navigate = useNavigate();

    const [getData,setData] =useState("");


    useEffect(()=>{
        TrackOrder();
    },[]);

     

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
                // console.log(responce.createdAt);
        }
        catch (err) {
            console.log("Error shows ", err)
        }
    }

    return (
        <>
        <div>
       <div className='toTopBox'>
       Hey! Please note that The Souled Store team will never ask you to disclose any financial information or for payment regarding any contest. For COD orders we do not collect money before the order delivery. Do not share any such sensitive details. Stay secure and stay safe.
       </div>
       <div className='orderHeading'>MY ORDERS</div>
       <div className='order-container'>
       {getData && getData.length > 0 ? getData.map((item, index)=>( 
        <>
        <div className='order-card-ctn' key={index}>
            <p className='oredr-item'>Ordered At: {new Date(item.createdAt).toLocaleDateString('en-GB')}</p>
            <p className='oredr-item'>{item.order.items[0].product.name}</p>
            <p className='oredr-item'>{item.order.items[0].product.price}</p>
            {item.order.items.map((image, index)=>(
                <img className='order-img' key={index} src={image.product.displayImage}/>
            ))}

            <p className='oredr-item'><span style={{color:"green"}}>Deliver to:</span> {item.order.shipmentDetails.address.street}, {item.order.shipmentDetails.address.city}, {item.order.shipmentDetails.address.state}, {item.order.shipmentDetails.address.country}</p>

        </div>
        </>
        ))
        :
        <div className="wishlistprod">
                    <div>                   
                      <img src='https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png'/>
                      <h3>Your Order History is Lonely</h3>
                      <p>Do Shopping to track your History</p>
                      <button onClick={()=>navigate('/')}>Continue shopping</button>
                    </div>
                  </div>
       }
       </div>
        </div>     
        </>
    )
}
