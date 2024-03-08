import "../styles/Nav.css";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from "../providers/UserProvider";
import { Link } from 'react-router-dom';




function Navbar() {

  const { getToken, getName, TokenHandler, NameHandler } = useUser();

  const logOutHandler = () => {
    TokenHandler(null);
    NameHandler(null);
  }

  const [getData, setData] = useState([]);

  useEffect(() => {
    const mensList = async () => {

      try {
        const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories", {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        // console.log(responce.data.data);
        setData(responce.data.data)
      }
      catch (err) {
        console.log("Error shows ", err);
      }
    }
    mensList();

  }, [])


  return (
    <>
      <nav>
        <div className="nav">
          <div className="topBottomNav">
            <div className="topNav">
              <ul className="topNavLeft">
                <NavLink to='/Women'>
                  <li className="topNavLeftItem">WOMEN</li>
                </NavLink>
                <NavLink to='/Men'>
                  <li className="topNavLeftItem">MEN</li>
                </NavLink>
              </ul>
              <div className="topNavRight flex">
                <span>TRACK ORDER</span>
                <span>CONTACT US</span>
                <span><FaMobileScreenButton />DOWNLOAD APP</span>
              </div>
            </div>
            <div className="bottomNav">
              <div className="bottomNavLeft">
                <div className="logoNav">
                  <img src="https://www.thesouledstore.com/static/img/300x157-twitter.png" />
                </div>
                {
                  getData.map((item, index) => {
                    return <div key={index} className="categoryParent">
                      {item.toUpperCase()}
                      <div className="categoryUnderline" />
                    </div>
                  })
                }
              </div>
              <div className="bottomNavRight flex">
                <div className="categoryParent">
                  <span>
                    {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
                    <FaSearch /></span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span><FaRegHeart /></span>
                </div>
                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">  */}
                <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown my-2 my-lg-0 left-nav" >                 
                  <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                    {getToken ? <span><FaRegUser /> {getName.toUpperCase()}</span> : <span><FaRegUser /></span>}
                  </div>
                  <div className="dropdown-menu">
                    {getToken && <><Link className="dropdown-item" onClick={logOutHandler} to="/login">Logout</Link></>}
                    {!getToken && <>
                      <Link className="dropdown-item" to="/login">Login</Link>
                      <Link className="dropdown-item" to="/register">Register</Link>
                    </>}
                  </div>
                </li>
                </ul>
                {/* </div> */}
                <div className="categoryParent">
                  <span><HiOutlineShoppingBag /></span>
                </div>
             

              </div>
            </div>
          </div>
        </div>
      </nav>
      
    </>
  )
}

export default Navbar