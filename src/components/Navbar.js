import "../styles/Nav.css";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { MdCancel } from "react-icons/md";
import { useUser } from "../providers/UserProvider";
import { Link } from 'react-router-dom';
import WhishList from "./WhishList";
import TrackOrder from "./TrackOrder";
import { MdMenu } from "react-icons/md";
import ResponNav from './ResponNav';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Navbar() {

const { whishListItem, getToken, getName, setNewToken, token, TokenHandler, NameHandler, categoryToggle, setCategoryToggle,
searchItem, setSearchItem, wishListCount, cartItemCount, setCartItemCount, cartitem,isScreenSmall, setIsScreenSmall } = useUser();

const [isHovered, setIsHovered] = useState(false);
const [togglesearch, settogglesearch] = useState(false)
// const [loginFirst, setLoginFirst] = useState(false)
const [toggelNav, setToggleNav] = useState(false)
const [selectedGender, setSelectedGender] = useState("Men");
const navigate = useNavigate();

// const toggeleNavBar = () => {
// setToggleNav(!toggelNav);

// console.log("clicked")
// }

const nevigateToProductCategory = (value) => {
navigate(`/ProductList?category=${value}`);
}

const handleMouseEnter = () => {
setIsHovered(true);
};
const handleMouseLeave = () => {
setIsHovered(false);
};



useEffect(() => {
const checkScreenSize = () => {
setIsScreenSmall(window.innerWidth < 1100);
};

window.addEventListener("resize", checkScreenSize);
setToggleNav(!toggelNav);
return () => window.removeEventListener("resize", checkScreenSize);
}, []);


const logOutHandler = () => {
TokenHandler(null);
NameHandler(null);
localStorage.removeItem("token");
localStorage.removeItem("name");
localStorage.removeItem("wishList");
localStorage.removeItem("cartItem");
localStorage.removeItem("addData");
setNewToken("")
}

const [getData, setData] = useState([]);

useEffect(() => {
const categoryList = async () => {

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
categoryList();
localStorage.setItem("GENDER", "Men");
}, []);

// console.log(getName);
const searchMethod = async (searchValue) => {
setSearchItem(searchValue);
if (searchValue !== "" && searchValue !== null && searchItem !== undefined) {
navigate(`/ProductList?category=${searchValue}`)
}


}
// useEffect(()=>{
//   setTimeout(() => {
//     setLoginFirst(true)
//   }, 2000);
// }, [])


return (
<>
{
  isScreenSmall && <ResponNav/>
}
{
 !isScreenSmall && 
   <nav>
  <div className="nav">
    <div className="topBottomNav">
        <ToastContainer position="top-centre"/>
      <div className="topNav">
        <ul className="topNavLeft">
          <NavLink to='/Women'>
            <a className={selectedGender === "Women" ? "topNavLeftItem highlight" : "topNavLeftItem" } onClick={() =>{ localStorage.setItem("GENDER", "Women"); setSelectedGender("Women")} }>WOMEN</a >
          </NavLink >
          <NavLink to='/Men'>
            <a className={selectedGender === "Men" ? "topNavLeftItem highlight" : "topNavLeftItem" }  onClick={() => {localStorage.setItem("GENDER", "Men"); setSelectedGender("Men")}}>MEN</a>
          </NavLink>
        </ul >
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

              {/* setSearchItem(e.target.value) */}
              {<input type="text" value={searchItem} onChange={(e) => searchMethod(e.target.value)} placeholder="Search..." className="search-bar" />}
              <div style={{ color: "red" }} className="search-icon" >
                <FaSearch />
              </div>
            </div>

            {/* <span className="search-icon" onClick={()=>toggleSearchBar()}>
        <FaSearch /></span>
        {!isSearchBarOpen && <span className="search-bar">
          <input value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} type="search" placeholder="Searchbar..."/></span>} */}
            {/* <div className="categoryUnderline" /> */}
          </div>
          <div onClick={() => { console.log("clicked heart"); localStorage.getItem('token') ? navigate('/WhishList') :  toast.warn("Please Login First!")}} className="categoryParent">
            <span ><FaRegHeart /></span>
            {localStorage.getItem('token') && <sup>{whishListItem ? whishListItem.length : 0}</sup>}
            {/* {loginFirst && <div>
             { toast("Please Login First!")}
              <MdCancel onClick={() => setLoginFirst(false)} />
            </div>} */}
          </div>
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">  */}
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown my-2 my-lg-0 left-nav" >
              <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                {localStorage.getItem("token") ? <span><FaRegUser /> {localStorage.getItem("name")}</span> : <span><FaRegUser /></span>}
              </div>
              <div className="dropdown-menu">
                {localStorage.getItem("token") && <><Link className="dropdown-item" onClick={logOutHandler} to="/login">Logout</Link>
                  <Link className="dropdown-item" to="/TrackOrder">TrackOrder</Link>
                </>}
                {!localStorage.getItem("token") && <>
                  <Link className="dropdown-item" to="/login">Login</Link>
                </>}
              </div>
            </li>
          </ul>
          {/* </div> */}
          <div onClick={() => localStorage.getItem('token') ? navigate('/ProductCart') : toast.warn("Please Login First!")} className="categoryParent">
            <span ><HiOutlineShoppingBag /></span>
            {localStorage.getItem('token') && <sup>{cartitem.length}</sup>}
          </div>
        </div>
      </div >
      {/* <div className="bottomNav">
        <div className="bottomNavLeft">
          <div className="logoNav">
            <img className="nav-img-logo" src="https://www.thesouledstore.com/static/img/300x157-twitter.png" onClick={() => navigate('/')} />
          </div>
          {
            getData.map((item, index) => {
              return <div onClick={() => { nevigateToProductCategory(item), setCategoryToggle(!categoryToggle), searchMethod("") }} key={index} className="categoryParent">
                {item}
                <div className="categoryUnderline" />
              </div>
            })
          }
        </div>
        <div className="bottomNavRight flex ">
          <span className="bottomRightNavItem categoryParent" onClick={() => navigate('/TrackOrder')}>Track Order</span>
        </div>
        
      </div> */}
      <ResponNav/>
    </div >
  </div >
</nav >
}


 
</>
)
}

