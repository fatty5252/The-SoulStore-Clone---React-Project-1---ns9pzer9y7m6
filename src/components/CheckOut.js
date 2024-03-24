import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import "../styles/Checkout.css";
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {

    // const {addData} = useUser();
    const { storageData, setStorageData, totalAmmount } = useUser();
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
    const navigate = useNavigate()

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
                    "productId": "652675cddaf00355a7838161",
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
            setTimeout(() => {
                setpaymentdone(false)
                navigate('/')
            }, 5000);
        } else {
            alert("Enter correct UPI")
        }
    }

    const handlepaymentfromdebit = () => {
        if (debitdata.cardno.length === 16 && debitdata.CVV.length === 3 && debitdata.Expirymonth !== "" && debitdata.Expiryyear !== "") {
            setpaymentdone(!paymentdone)
            setTimeout(() => {
                setpaymentdone(false)
            }, 5000);
        } else if (debitdata.CVV.length !== 3) {
            alert("Enter correct CVV")
        } else if (debitdata.cardno.length !== 16) {
            alert("Enter correct Card no.")
        }
        else {
            alert("Enter correct card details")
        }
    }

    return (
        <div className='checkout-main'>
            {paymentdone && <div className='paymentdone'>
                <div className='paymentPopup'>
                    <div className='flexc g20'>
                        {/* <div className='flexBet'>{logo}</div> */}
                        <img src='https://www.thesouledstore.com/static/img/300x157-twitter.png'/>
                        <h2 style={{ color: 'green', textAlign: 'center' }}>Payment Successful</h2>
                        <h2 style={{ textAlign: 'center' }}>Dear </h2>
                        <p style={{ textAlign: 'center' }}>Order Confirmed 🙂</p>
                    </div>
                    <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px dashed #808080', paddingTop: '10px' }}>The booking details is been sent to your email.</div>
                </div>
            </div>}
            <div className='checkout-main-left'>
                <div className='add-box'>
                    {storageData &&
                        <div className='checkout-address-box'>
                            <p>{storageData.name} {storageData.lastName}, {storageData.pincode}</p>
                            <p>{storageData.house} {storageData.street} {storageData.landmark} {storageData.city}</p>
                        </div>}
                    {/* <div>
                        <button onClick={() => localStorage.removeItem('addData')} className='change-btn'>Remove Address</button>
                    </div> */}
                </div>


                <div className='main-upi-ctn'>
                    <p className='upi-head' onClick={() => { setOpenUPI(!openUPI), setOpendebit(false) }}>Pay with UPI</p>

                    {openUPI && <input className='upi-ctn' type='text' onChange={(e) => setupi(e.target.value)} value={upi} placeholder='Enter UPI' />}

                </div>

                <p className='atm-head' onClick={() => { setOpendebit(!openDebit), setOpenUPI(false) }}>Pay with any Debit card</p>
                {openDebit &&
                    <><div className='main-atm-ctn'>
                        <div className='card-num-ctn'>
                            <input className='debit-input' type='text' maxLength={16} value={debitdata.cardno} onChange={(e) => AddressInfo("cardno", e.target.value)} placeholder='Card no.' />
                        </div>
                        <div className='exp-cv-ctn'>
                            <input className='debit-input' type='text' value={debitdata.Expirymonth} onChange={(e) => AddressInfo("Expirymonth", e.target.value)} placeholder='Expiry month' />
                            <input className='debit-input' type='text' value={debitdata.Expiryyear} onChange={(e) => AddressInfo("Expiryyear", e.target.value)} placeholder='Expiry year' />
                            <input className='debit-input cvv-inp' type='text' maxLength={3} value={debitdata.CVV} onChange={(e) => AddressInfo("CVV", e.target.value)} placeholder='CVV' />
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
                        <p>{(totalAmmount * 18) / 100}</p>
                    </div>
                    <div className='ct flex'>
                        <p>TOTAL AMMOUNT</p>
                        <p>{(totalAmmount + (totalAmmount * 18) / 100)}</p>
                    </div>
                </div>
                <div className='cont-btn flex'>
                    {openUPI && <button onClick={() => handlepaymentfromUpi()} className='cfrm-order-btn'>CONFIRM ORDER</button>}
                    {openDebit && <button onClick={() => handlepaymentfromdebit()} className='cfrm-order-btn'>CONFIRM ORDER</button>}
                </div>
            </div>
        </div>
    )
}
