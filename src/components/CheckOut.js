import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';

export default function CheckOut() {

    // const {addData} = useUser();
    const [addData, setAddData] = useState(JSON.parse(localStorage.getItem("addData")));
    // console.log(addData);

    useEffect(() => {
        checkOutList();
    }, [])

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
              }}); console.log(responce);
            }
            
        
        catch (err) {
            console.log("Error shows ", err);
        }
    }


    return (
        <div>

        </div>
    )
}
