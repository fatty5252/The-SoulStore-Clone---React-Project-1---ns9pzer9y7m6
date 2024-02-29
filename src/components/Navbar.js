import "../styles/Nav.css";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";



function Navbar(){
    return (
        <>
        <nav>
        <div className="nav">
          <div className="topBottomNav">
            <div className="topNav">
              {/* <div className="topNavLeft flex">
                <div className="topNavLeftItem">WOMEN</div>
                <div className="topNavLeftItem">MEN</div>
                <div className="topNavLeftItem">KIDS</div>
              </div> */}
              <ul className="topNavLeft">
                <li className="topNavLeftItem">WOMEN</li>
                <li className="topNavLeftItem">MEN</li>
                <li className="topNavLeftItem">KIDS</li>
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
                <div className="categoryParent">
                  <span>TOPWEAR</span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span>BOTTOMWEAR</span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span>SNEAKERS</span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
              </div>
              <div className="bottomNavRight flex">
              <div className="categoryParent">
                  <span><FaSearch /></span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span><FaRegHeart/></span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span><FaRegUser /></span>
                  {/* <div className="categoryUnderline" /> */}
                </div>
                <div className="categoryParent">
                  <span><HiOutlineShoppingBag /></span>
                  {/* <div className="categoryUnderline" /> */}               
              </div>
                {/* <span><FaSearch /></span>
                <span><FaRegUser /></span>
                <span><FaRegHeart /></span>
                <span><HiOutlineShoppingBag /></span> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
        </>
    )
}

export default Navbar