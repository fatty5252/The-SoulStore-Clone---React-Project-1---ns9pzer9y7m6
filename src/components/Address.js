import React, { useEffect, useState } from 'react'
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/Address.css';
import Footer from './Footer';

export default function Address() {

  const { storageData, setStorageData, totalAmmount } = useUser();
  const [toggleForm, setToggleForm] = useState(false);
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
  }

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

  function AddressInfo(key, value) {
    setAddData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
    <div className='head-div'>
      <div className='left-ctn-address'>
      {storageData && !toggleForm &&
        <div className='address-box'>
        <h3>{storageData.name} {storageData.lastName}</h3>
        <h3>{storageData.house} {storageData.street}</h3>
        <h3>{storageData.landmark}</h3>
        <h3>{storageData.city}-{storageData.pincode}</h3>
        <h3>{storageData.state} {storageData.country}</h3>
        <h3>Mobile: {storageData.phnum}</h3>

      </div>}
      
      {!toggleForm && <button className='tgl-btn' onClick={() => setToggleForm(!toggleForm)}>+</button>}
      {toggleForm && <div className='form-parent'>
        <form className='form-main'>
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
          <div className='fr-btn'>
          <button type="button" onClick={() => closeForm()} class="btn-primary">Cancel</button>
          <button type="button" onClick={() => saveAdd()} class="btn-primary">Save</button>
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
          <p>{(totalAmmount * 18) / 100}</p>
        </div>
        <div className='crt-dtl'>
          <p>TOTAL AMMOUNT</p>
          <p>{totalAmmount + (totalAmmount * 18) / 100}</p>
        </div>
        <div className='rt-crt-cnt'>
          <button onClick={() => navigate('/Checkout')} className='order-btn width-100'>CONFIRM ORDER</button>
        </div>
      </div>
      </div>
      <div className='address-footer'>
      <Footer/>
      </div>
    </div>
  )
}
