import React from 'react'
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';


export default function Footer() {
  const navigate = useNavigate()
  // function navigattocomingsoon(event){
  //   navigate
  // }
  return (
    <div>
      <h2 className='top-footer-heading'>HOMEGROWN INDIAN BRAND</h2>
      <h3 className='bottom-footer-heading'>Over <span className='heading-sub'>6 Million</span> Happy Customers</h3>
      <div onClick={(event) => {
            event.target.tagName === 'P' && navigate('/ComingSoon');
          }} className='main-footer'>
        <div className='sub-footer'>
          <div className='red-head'>NEED HELP</div>
          <div>
            <p>Contact Us</p>
            <p>Track Order</p>
            <p>Rteurns & Refunds</p>
            <p>FAQs</p>
            <p>My Account</p>
          </div>
        </div>
        <div className='sub-footer'>
          <div className='red-head'>MORE INFO</div>
          <p>T&C</p>
          <p>Privacy Policy</p>
          <p>Sitemap</p>
        </div>
        <div className='sub-footer'>
          <div className='red-head'>COMPANY</div>
          <p>About Us</p>
          <p>Careers</p>
          <p>Community initiatives</p>
          <p>Souled Army</p>
        </div>
        <div className='sub-footer'>
          <div className='red-head'>STORE NEAR ME</div>
          <p>Bandra</p>
          <p>Thane</p>
          <p>Colaba</p>
          <p>Palladium</p>
          <p>Malad</p>
          <p>Pune</p>
          <p>Bnaglore</p>
          <p>Indore</p>
          <p>Haryana</p>
          <p>Bhopal</p>
          <p>Surat</p>
        </div>
      </div>
      <div style={{textAlign:'center'}}> © The Souled Store made by Fatema 2024-25</div>
      
    </div>
  )
}
