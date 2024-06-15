import React, { useEffect, useState } from 'react'
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/Address.css';
import Footer from './Footer';
import { GiButterToast } from 'react-icons/gi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Address() {

  const { storageData, setStorageData, totalAmmount } = useUser();
  const [toggleForm, setToggleForm] = useState(false);
  // const [msg, setMessage] = useState('');
  const [addData, setAddData] = useState({
    name: "", lastName: "", house: "", street: "", landmark: "",
    pincode: "", city: "", state: "", country: "India", phnum: ""
  });
  // console.log(storageData);
  
  const navigate = useNavigate();

  const closeForm = () => {
    setToggleForm(false);
    setAddData({
      name: "", lastName: "", house: "", street: "", landmark: "",
      pincode: "", city: "", state: "", country: "", phnum: ""
    })
  }
  
  const saveAdd = () => {
    if (addData.name && addData.lastName && addData.house && addData.street && addData.landmark &&
      addData.pincode && addData.city && addData.state && addData.country && addData.phnum) {
      localStorage.setItem("addData", JSON.stringify(addData));
      setToggleForm(false);
      setAddData({
        name: "", lastName: "", house: "", street: "", landmark: "",
        pincode: "", city: "", state: "", country: "", phnum: ""
      })
    }
     window.location.reload();
  }
  
//  const [toggleaddress, settoggleaddress] = useState(false)
//   useEffect(()=>{
//     settoggleaddress(!toggleaddress)
//   }, [toggleForm])

  const indianStatesArray = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
  ];
  const AddFormSubmithandler=()=>{
    // regex pattern for pincode
    let cvv = /^[0-9]{6}$/;
    let resultCVV = cvv.test(addData.pincode);
    if (resultCVV == false){
        toast("Invalid Pincode");
        return;
    }
    //regex pattern for phnumber
    let regex = /^[0-9]{10}$/;
        let result = regex.test(addData.phnum);
        console.log(result);
        if (result == false){
          toast("Invalid MobileNo.");
            return;
        }
  }

  function AddressInfo(key, value) {
    setAddData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
    <div className='flex add-opt'> <p style={{color:'#298E83'}}>MY BAG</p><p style={{color:'#298E83'}}> ----------- ADDRESS</p><p> ----------- PAYMENT</p></div>
    <ToastContainer position="top-center" />
    <div className='head-div'>
      <div className='left-ctn-address'>
      {storageData && !toggleForm &&
        <div className='address-box'>
        <p className='add-name'>{storageData.name} {storageData.lastName}</p>
        <p>{storageData.house} {storageData.street}</p>
        <p>{storageData.landmark}</p>
        <p>{storageData.city}-{storageData.pincode}</p>
        <p>{storageData.state} {storageData.country}</p>
        <p>Mobile: {storageData.phnum}</p>

      </div>}
      
      {!toggleForm && <button className='tgl-btn' style={{color:"black", opacity:"0.5"}} onClick={() => setToggleForm(!toggleForm)}>+<br/>Add New Address</button>}
      {toggleForm && <div className='form-parent'>
        <form className='form-main' onSubmit={()=>AddFormSubmithandler()}>
        <div className='form-heading'>ADD NEW ADRESS</div>
          <div className='common-forfirst-last'>
            <div className='item-form'>
              <input onChange={(e) => { AddressInfo("name", e.target.value) }} type="text" placeholder='Name' value={addData.name} />
            </div>
            <div className='item-form'>
              <input onChange={(e) => { AddressInfo("lastName", e.target.value) }} type="text" placeholder='LastName' value={addData.lastName} />
            </div>
          </div>

          <div className='item-form'>
            <input onChange={(e) => { AddressInfo("house", `${e.target.value}`) }} type="text" placeholder='House No., Building Name' value={addData.house} />
          </div>
          <div className='item-form'>
            <input onChange={(e) => AddressInfo("street", `${e.target.value}`)} type="text" placeholder='Street Name, Area' value={addData.street} />
          </div>
          <div className='item-form'>
            <input onChange={(e) => { AddressInfo("landmark", `${e.target.value}`) }} type="text" placeholder='Landmark' value={addData.landmark} />
          </div>

          <div className='common-forfirst-last'>
            <div className='item-form'>
              <input onChange={(e) => AddressInfo("pincode", `${e.target.value}`)} type="text" placeholder='Pin Code' value={addData.pincode} />
            </div>
            {/* <div>{msg}</div> */}
            <div className='item-form'>
              <input onChange={(e) => AddressInfo("city", `${e.target.value}`)} type="text" placeholder='City/District' value={addData.city} />
            </div>
          </div>

          <div className='common-forfirst-last'>
            <select className='item-form' onChange={(e) => AddressInfo("country", e.target.value)} value={addData.country}>
              <option value="India">India</option>
            </select>
            <select className='item-form' value={addData.state} onChange={(e) => AddressInfo("state", `${e.target.value}`)} >
              {
                indianStatesArray.map((item) => (
                  <option key={item}>{item}</option>
                ))
              }
            </select>
          </div>

          <div className='item-form'>
            <input onChange={(e) => AddressInfo("phnum", `${e.target.value}`)} type="tel" placeholder='Phone No.' value={addData.phnum} />
          </div>
          {/* <div>{msg}</div> */}
          <div className='fr-btn'>
          <button type="button" onClick={() => closeForm()} className="btn-primary">Cancel</button>
          <button type="button" onClick={()=>{AddFormSubmithandler(), saveAdd()}}  className="btn-primary">Save</button>
          </div>
        </form>
        {/* <p>{addData.name}</p> */}
      </div>}
      </div>
      <div className='right-ctn-address'>
        <h2>BILLING DETAILS</h2>
        <div className='crt-dtl'>
          <p>CART TOTAL</p>
          <p>{totalAmmount}</p>
        </div>
        <div className='crt-dtl'>
          <p>GST</p>
          <p>{Math.round((totalAmmount * 18) / 100)}</p>
        </div>
        <div className='crt-dtl'>
          <p>TOTAL AMMOUNT</p>
          <p>{Math.round(totalAmmount + (totalAmmount * 18) / 100)}</p>
        </div>
        <div className='rt-crt-cnt'>
          {localStorage.getItem('addData') && <button onClick={() => navigate('/Checkout')} className='order-btn width-100'>CONFIRM ORDER</button>}
        </div>
      </div>
      </div>
      <div className='address-footer'>
      </div>
    </div>
  )
}
