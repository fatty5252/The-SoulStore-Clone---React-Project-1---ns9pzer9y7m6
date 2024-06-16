import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import "../styles/Checkout.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckOut() {

    const navigate = useNavigate();

    // const {addData} = useUser();
    const { storageData, setStorageData, totalAmmount, productID } = useUser();
    const [addData, setAddData] = useState(JSON.parse(localStorage.getItem("addData")));
    // console.log(addData);

    const [openUPI, setOpenUPI] = useState(false)
    const [upi, setupi] = useState('')
    const [openDebit, setOpendebit] = useState(false)
    const [debitdata, setdebitdata] = useState({
        name: "", cardno: "", CVV: "", Expirymonth: "", Expiryyear: ""
    });
    const [paymentdone, setpaymentdone] = useState(false);
    //   console.log(debitdata.name)

    useEffect(() => {
        checkOutList();
    }, [])

    function AddressInfo(key, value) {
        setdebitdata((prev) => ({ ...prev, [key]: value }));
    }

    const checkOutList = async () => {
        try {
            const responce = await axios.post("https://academics.newtonschool.co/api/v1/ecommerce/order",
                {
                    "productId": `${productID}`,
                    "quantity": 2,
                    "addressType": "HOME",
                    "address": {
                        "street": addData.street,
                        "city": addData.city,
                        "state": addData.state,
                        "country": addData.country,
                        "zipCode": addData.pincode
                    },
                },
                {
                    headers: {
                        projectId: "rhxg8aczyt09",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            // console.log(responce);
        }
        catch (err) {
            console.log("Error shows ", err);
        }
    }

    const handlepaymentfromUpi = () => {
        if (upi !== '' && upi.includes("@")) {
            setpaymentdone(!paymentdone)        
                setpaymentdone(false)
                navigate('/SuccessPayment')          
        } else {
               <ToastContainer position="top-right" />
               toast.error("Enter correct UPI")
        }
    }
    
    const handlepaymentfromdebit = () => {

        // regex patter for card number 
        let cardNum = /^[0-9]{16}$/;
        let resultCardNum = cardNum.test(debitdata.cardno);
        if (resultCardNum == false){
            toast.error("Invalid Card Number");
            return;
        }
        
        //regex pattern for month of expiry
        let monthExp = /^(0[1-9]|1[0-2])$/;
        let resultExp = monthExp.test(debitdata.Expirymonth);
        if (resultExp == false){
            toast.error("Invalid Month of Expiry");
            return;
        }
        //regex pattern for Year of Expiry
        let yearExp = /^(20[2-9][0-9]|2[1-9][0-9]{2}|30[0-5][0-9]|3060)$/;
        let resultExpYear = yearExp.test(debitdata.Expiryyear);
        if (resultExpYear == false){
            toast.error("Invalid Year of Expiry");
            return;
        }
       
        // regex pattern for cvv
        let cvv = /^[0-9]{3}$/;
        let resultCVV = cvv.test(debitdata.CVV);
        if (resultCVV == false){
            toast.error("Invalid CVV");
            return;
        }

        if (resultCardNum === true && resultCVV === true && resultExp === true){
            setpaymentdone(!paymentdone)
            setTimeout(() => {
                setpaymentdone(false)
                navigate('/SuccessPayment') 
            }, 3000);
        } 
    }

    return (
        <>
        <div className='flex pay-opt'> <p style={{color:'#298E83'}}>MY BAG</p><p style={{color:'#298E83'}}> ----------- ADDRESS</p><p style={{color:'#298E83'}}> ----------- PAYMENT</p></div>
        <ToastContainer position="top-right" />
        <div className='checkout-main'>
           {/* ========================Address box====================================== */}
            <div className='checkout-main-left'>
                <div className='add-box'>
                    {storageData &&
                        <div className='checkout-address-box'>
                            <p className='add-p' style={{color:"#117A7A"}}>Delivered to: {storageData.name} {storageData.lastName}, {storageData.pincode}</p>
                            <p className='add-p'>{storageData.house} {storageData.street} {storageData.landmark} {storageData.city}</p>
                        </div>}
                    {/* <div>
                        <button onClick={() => localStorage.removeItem('addData')} className='change-btn'>Remove Address</button>
                    </div> */}
                </div>

 {/* ===================UPI DETAILS======================= */}
                <div className='main-upi-ctn'>
                    <p className='upi-head' onClick={() => { setOpenUPI(!openUPI), setOpendebit(false) }}>Pay with UPI</p>

                    {openUPI && <input className='upi-ctn' type='text' onChange={(e) => setupi(e.target.value)} value={upi} placeholder='Enter UPI' />}

                </div>
{/*  ======================DEBIT CARD DETAILS================ */}
                <p className='atm-head' onClick={() => { setOpendebit(!openDebit), setOpenUPI(false) }}>Pay with any Debit card</p>
                {openDebit &&
                    <><div className='main-atm-ctn'>
                        <div className='card-num-ctn'>
                            <input className='debit-input' type='text' maxLength={16} value={debitdata.cardno} onChange={(e) => AddressInfo("cardno", e.target.value)} placeholder='xxxx xxxx xxxx' />
                        </div>
                        <div className='exp-cv-ctn'>
                            <input className='debit-input' type='text' value={debitdata.Expirymonth} onChange={(e) => AddressInfo("Expirymonth", e.target.value)} placeholder='MM' />
                            <input className='debit-input' type='text' value={debitdata.Expiryyear} onChange={(e) => AddressInfo("Expiryyear", e.target.value)} placeholder='YEAR' />
                            <input className='debit-input cvv-inp' type='text' value={debitdata.CVV} onChange={(e) => AddressInfo("CVV", e.target.value)} placeholder='CVV' />
                        </div>
                        <div className='atm-card-name'>
                            <input className='debit-input' type='text' value={debitdata.name} onChange={(e) => AddressInfo("name", e.target.value)} placeholder='Cardholder name' />
                        </div>
                        <div className='img-debit-ctn'>
                            <img style={{ width: '40px' }} src="https://prod-img.thesouledstore.com/public/theSoul/images/credit-card.png?format=webp&amp;w=768&amp;dpr=1.0" alt="Credit Card" />
                        </div>
                    </div>
                    </>

                }
            </div>


            <div className='checkout-main-right'>
                <div className='cont-btn flex'>
                    {openUPI && <button onClick={() => handlepaymentfromUpi()} className='cfrm-order-btn'>CONFIRM ORDER</button>}
                    {openDebit && <button onClick={() => handlepaymentfromdebit()} className='cfrm-order-btn'>CONFIRM ORDER</button>}
                </div>
                <p className='bill-heading'>BILLING DETAILS</p>

                <div className='bill-details'>
                    <div className='ct flex'>
                        <p>CART TOTAL</p>
                        <p>{totalAmmount}</p>
                    </div>
                    <div className='ct flex'>
                        <p>GST</p>
                        <p>{Math.round((totalAmmount * 18) / 100)}</p>
                    </div>
                    <div className='ct flex'>
                        <p>TOTAL AMMOUNT</p>
                        <p>{Math.round((totalAmmount + (totalAmmount * 18) / 100))}</p>
                    </div>
                </div>
                <div className='cont-btn flex'>
                    {openUPI && <button onClick={() => handlepaymentfromUpi()} className='cfrm-order-btn'>CONFIRM ORDER</button>}
                    {openDebit && <button onClick={() => handlepaymentfromdebit()} className='cfrm-order-btn'>CONFIRM ORDER</button>}
                </div>
            </div>
        </div>
        </>
    )
}
