import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import "../styles/Checkout.css";

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


    return (
        <div className='checkout-main'>
            <div>
                {storageData &&
                    <div className='address-box'>
                        <h1>{storageData.name} {storageData.lastName}, {storageData.pincode}</h1>
                        <h1>{storageData.house} {storageData.street} {storageData.landmark} {storageData.city}</h1>
                    </div>}

                <p onClick={() => setOpenUPI(!openUPI)}>Pay with any UPI App</p>
                {openUPI && <input type='text' onChange={(e) => setupi(e.target.value)} value={upi} placeholder='Enter UPI' />}

                <p onClick={() => setOpendebit(!openDebit)}>Pay with any Debit card</p>
                {openDebit &&
                    <>
                        <input type='text' value={debitdata.cardno} onChange={(e) => AddressInfo("cardno", e.target.value)} placeholder='Card no.' />
                        <input type='text' value={debitdata.CVV} onChange={(e) => AddressInfo("CVV", e.target.value)} placeholder='CVV' />
                        <input type='text' value={debitdata.Expirymonth} onChange={(e) => AddressInfo("Expirymonth", e.target.value)} placeholder='Expiry month' />
                        <input type='text' value={debitdata.Expiryyear} onChange={(e) => AddressInfo("Expiryyear", e.target.value)} placeholder='Expiry year' />
                        <input type='text' value={debitdata.name} onChange={(e) => AddressInfo("name", e.target.value)} placeholder='Cardholder name' />

                        <img style={{ width: '40px' }} src="https://prod-img.thesouledstore.com/public/theSoul/images/credit-card.png?format=webp&amp;w=768&amp;dpr=1.0" alt="Credit Card" />
                    </>
                }
            </div>

            <div className='rightCart-container'>
                <div className='cont-btn flex'>
                    <button className='order-btn'>CONFIRM ORDER</button></div>
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
                    <button className='order-btn'>CONFIRM ORDER</button></div>

            </div>
        </div>
    )
}
