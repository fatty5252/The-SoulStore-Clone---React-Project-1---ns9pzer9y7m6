import React, { useState } from 'react'

export default function Address() {

  const [addData, setAddData] = useState({
    name: "", lastName: "", house: "", street: "", landmark: "",
    pincode: "", city: "", state: "", country: "India", phnum: ""
  });
  console.log(addData.country);

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
      <div className='form-parent'>
        <form>
          <div >
            <input onChange={(e) => { AddressInfo("name", e.target.value) }} type="text" placeholder='Name' value={addData.name} />
          </div>
          <div >
            <input onChange={(e) => { AddressInfo("lastName", e.target.value) }} type="text" placeholder='LastName' value={addData.lastName} />
          </div>
          <div>
            <input onChange={(e) => { AddressInfo("house", `${e.target.value}`) }} type="text" placeholder='House No., Building Name' value={addData.house} />
          </div>
          <div >
            <input onChange={(e) => AddressInfo("street", `${e.target.value}`)} type="text" placeholder='Street Name, Area' value={addData.street} />
          </div>
          <div >
            <input onChange={(e) => { AddressInfo("landmark", `${e.target.value}`) }} type="text" placeholder='Landmark' value={addData.landmark} />
          </div>
          <div >
            <input onChange={(e) => AddressInfo("pincode", `${e.target.value}`)} type="text" placeholder='Pin Code' value={addData.pincode} />
          </div>
          <div >
            <input onChange={(e) => AddressInfo("city", `${e.target.value}`)} type="text" placeholder='City/District' value={addData.city} />
          </div>
          <select onChange={(e) => AddressInfo("country", e.target.value)} value={addData.country}>
            <option value="India">India</option>
          </select>
          <select value={addData.state} onChange={(e) => AddressInfo("state", `${e.target.value}`)} >
            {
              indianStatesArray.map((item) => (
                <option key={item}>{item}</option>
              ))
            }
          </select>
          <div >
            <input onChange={(e) => AddressInfo("phnum", `${e.target.value}`)} type="tel" placeholder='Phone No.' value={addData.phnum} />
          </div>
          <button type="button" class="btn btn-primary">Cancel</button>
          <button type="button" class="btn btn-primary">Save</button>
        </form>
        <p>{addData.name}</p>
      </div>
    </div>
  )
}
