import "../styles/Nav.css";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from "../providers/UserProvider";
import { Link } from 'react-router-dom';
import WhishList from "./WhishList";




export default function Navbar() {

  const { getToken, getName, setNewToken, token, TokenHandler, NameHandler, categoryToggle, setCategoryToggle,
    searchItem, setSearchItem, wishListCount, cartItemCount, setCartItemCount } = useUser();

  const [isHovered, setIsHovered] = useState(false);
  const [togglesearch, settogglesearch] = useState(false)


  const navigate = useNavigate();

  const nevigateToProductCategory = (value) => {
    navigate(`/ProductList?category=${value}`);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const logOutHandler = () => {
    TokenHandler(null);
    NameHandler(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setNewToken("")
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
  }, []);

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
                {/* <span>TRACK ORDER</span>
                <span>CONTACT US</span>
                <span><FaMobileScreenButton />DOWNLOAD APP</span> */}
                <div className=" search-container">
                  {/* <div className="navbar">
                    <div className="search-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      {isHovered && (
                      <input type="text" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Search..." className="search-bar" />)}
                      <FaSearch />
                    </div>
                  </div> */}

                  <div className="navbar">
                    <div className="search-icon" onClick={()=>settogglesearch(!togglesearch)}>
                      <FaSearch />
                    </div>
                        {togglesearch && <input type="text" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Search..." className="search-bar" />}
                  </div>

                  {/* <span className="search-icon" onClick={()=>toggleSearchBar()}>
                  <FaSearch /></span>
                  {!isSearchBarOpen && <span className="search-bar">
                    <input value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} type="search" placeholder="Searchbar..."/></span>} */}
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span onClick={() => localStorage.getItem('token') ? navigate('/WhishList') : navigate('/login')}><FaRegHeart /></span>
                  {localStorage.getItem('token') && <p>{wishListCount}</p>}
                </div>
                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">  */}
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown my-2 my-lg-0 left-nav" >
                    <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                      {localStorage.getItem("token") ? <span><FaRegUser /> {localStorage.getItem("name").toUpperCase()}</span> : <span><FaRegUser /></span>}
                    </div>
                    <div className="dropdown-menu">
                      {localStorage.getItem("token") && <><Link className="dropdown-item" onClick={logOutHandler} to="/login">Logout</Link></>}
                      {!localStorage.getItem("token") && <>
                        <Link className="dropdown-item" to="/login">Login</Link>
                        <Link className="dropdown-item" to="/register">Register</Link>
                      </>}
                    </div>
                  </li>
                </ul>
                {/* </div> */}
                <div className="categoryParent">
                  <span onClick={() => localStorage.getItem('token') ? navigate('/ProductCart') : navigate('/login')}><HiOutlineShoppingBag /></span>
                  {localStorage.getItem('token') && <p>{cartItemCount}</p>}
                </div>
              </div>
            </div>
            <div className="bottomNav">
              <div className="bottomNavLeft">
                <div className="logoNav">
                  <img src="https://www.thesouledstore.com/static/img/300x157-twitter.png" onClick={() => navigate('/')} />
                </div>
                {
                  getData.map((item, index) => {
                    return <div onClick={() => { nevigateToProductCategory(item), setCategoryToggle(!categoryToggle) }} key={index} className="categoryParent">
                      {item.toUpperCase()}
                      <div className="categoryUnderline" />
                    </div>
                  })
                }
              </div>
              {/* <div className="bottomNavRight flex">
                <div className="categoryParent search-container">
                
                  <span className="search-icon" onClick={()=>toggleSearchBar()}>
                    <FaSearch /></span>
                    {!isSearchBarOpen && <span className="search-bar">
                      <input value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} type="search" placeholder="Searchbar..."/></span>}
                 
                </div>
                <div className="categoryParent">
                  <span onClick={()=>navigate('/WhishList')}><FaRegHeart /></span>
                  <p>{wishListCount}</p>
                </div>
               
                <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown my-2 my-lg-0 left-nav" >                 
                  <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                    {localStorage.getItem("token") ? <span><FaRegUser /> {localStorage.getItem("name").toUpperCase()}</span> : <span><FaRegUser /></span>}
                  </div>
                  <div className="dropdown-menu">
                    {localStorage.getItem("token") && <><Link className="dropdown-item" onClick={logOutHandler} to="/login">Logout</Link></>}
                    {!localStorage.getItem("token") && <>
                      <Link className="dropdown-item" to="/login">Login</Link>
                      <Link className="dropdown-item" to="/register">Register</Link>
                    </>}
                  </div>
                </li>
                </ul>
                <div className="categoryParent">
                  <span onClick={()=>navigate('/ProductCart')}><HiOutlineShoppingBag /></span>
                  <p>{localStorage.getItem("cartItem")}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}
