import React from 'react'
import { Link } from 'react-router-dom'



export default function SuccessPayment() {
    return (
        <div className='flex payment-main'>
            <div className='paymentdone' >
                <div className='flexc'>
                    {/* <div className='flexBet'>{logo}</div> */}
                    <img style={{ width: "10rem" }} src='https://www.thesouledstore.com/static/img/300x157-twitter.png' />
                    <h2 style={{ color: 'green', textAlign: 'center' }}>Payment Successful</h2>
                    <h2 style={{ textAlign: 'center' }}>Dear </h2>
                    <p style={{ textAlign: 'center' }}>Order Confirmed 🙂</p>
                    <Link to="/"><p style={{ textAlign: 'center' }}>Continue Shopping</p></Link>
                </div>
            </div>
        </div>
    )
}
