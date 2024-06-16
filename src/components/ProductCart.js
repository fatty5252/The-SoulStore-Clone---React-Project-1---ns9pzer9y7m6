import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import "../styles/ProductCart.css";
import { useUser } from '../providers/UserProvider';
import Footer from './Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductCart() {

  const navigate = useNavigate();

  const { addToWhishList, storageData, cartItemToggle, setCartItemToggle, totalAmmount, setTotalAmmount, cartitem, setCartItem, cartItemCount, setCartItemCount } = useUser();

  // const Cartlocation = useLocation();
  // const cartSerchParams = new URLSearchParams(Cartlocation.search);
  // let id = cartSerchParams.get("id");
  // let size = cartSerchParams.get("size");
  // let quantity = cartSerchParams.get("quantity");
  // console.log(cartitem);

  const [getSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selctSizeHandler = (size) => {
    setSize(size);
  }

  const selctQuantityHandler = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
  };

  console.log(localStorage.getItem("token"));
  // Delet Item API

  const deleteCartItems = async (itemId) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${itemId}`,
        {
          headers: {
            projectId: "rhxg8aczyt09",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      // console.log(cartItemCount);
      setCartItemCount(cartItemCount - 1);
      setCartItemToggle(!cartItemToggle);
      // console.log(response);
      //   setProductDetails(response.data.data)
    } catch (err) {
      console.log("Error shows ", err);
    }
  };

  // clear cart item
  const clearCartItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/`,
        {
          headers: {
            projectId: "rhxg8aczyt09",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setCartItemToggle(!cartItemToggle);
      setCartItemCount(0);
     

      // console.log(response);
      //   setProductDetails(response.data.data)
    } catch (err) {
      console.log("Error shows ", err);
    }
  };

  const navigateToCart = () => {
    cartitem.length > 0 ? navigate("/Address") : alert('No items in the cart');
  }


  return (
    <>
    <div >
     {cartitem.length > 0 && <div className='crt-heading'>
       <div className='flex bagaddpay'> <p style={{color:'#298E83'}}>MY BAG</p><p> ----------- ADDRESS</p><p> ----------- PAYMENT</p></div>
      </div>}
      <hr></hr>
      <div className='main-addCart-container flex'>
      <ToastContainer position="top-right" />
        <div className='leftCart-container flex' >
          <div className='address-bar flex'>
            {!storageData ? <span className='address-para '>Please select address..</span>
              :
              <div className='address-box-crt'>
                <p style={{color:"#117A7A"}}>{storageData.name} {storageData.lastName}, {storageData.pincode}</p>
                <p style={{color:"#117A7A"}}>{storageData.house} {storageData.street} {storageData.landmark} {storageData.city}</p>
              </div>}
            <button className='address-btn' onClick={navigateToCart}>ADD</button>
          </div>
          <div className={`${cartitem.length > 0 ? "prd-container" : "productcart-nf"} flex`}>
            {cartitem.length > 0 ?
              cartitem.map((item, index) => (
                <> <div className='subLeft flex'>
                  <img className='addCart-img' src={item.product.displayImage} />

                  <div className='subright flex'>
                    <p className='brand-name'>{item.product.name}</p>
                    <p className='price'>₹{item.product.price}</p>
                    <div className='qty-size flex'>
                      {/* <p>Please select a size.</p> */}
                      <div className='size-parent'>
                        <div className='quantity bold'>Size &nbsp;
                          <select onChange={(event) => selctSizeHandler(event)} value={getSize} name='getSize'>
                            <option value={"S"}>S</option>
                            <option value={"M"}>M</option>
                            <option value={"L"}>L</option>
                            <option value={"XL"}>XL</option>
                            <option value={"XXL"}>XXL</option>
                            <option value={"XXXL"}>XXXL</option>
                          </select>
                        </div>
                      </div>
                      {/* <p className='color bold'>Color: {productDetails.color}</p>
                      <p className='rating bold'>Ratings: {Math.round(productDetails.ratings)}/5</p> */}
                      <div className='quantity bold'>Quantity &nbsp;
                        <select onChange={(event) => selctQuantityHandler(event)} value={quantity} name='quantity'>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className='btns-del-add flex'>
                        <button onClick={() => {deleteCartItems(item.product._id); toast.success("Product deleted from cart successfully!")}}  className='remove-del'>REMOVE</button>
                        <button onClick={() => { addToWhishList(item.product._id), deleteCartItems(item.product._id); toast.success("Product move to wishlist successfully!") }}
                          className='remove-del' ><CiHeart /> MOVE TO WHISHLIST</button>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              ))
              :
              // <div className="productcart-nf">
                <div>
                  {/* <div className="flexXY">{notrainsfound}</div> */}
                  <img src='https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png'/>
                  <h3>Your Cart is lonely and looking for love.</h3>
                  <p>Add products to your Cart, review them anytime and easily move to cart.</p>
                  <button onClick={()=>navigate('/')}>Continue shopping</button>
                </div>
              // </div>
            }
          </div>

          {cartitem.length > 0 && <button className='clear-cart-btn' onClick={() => { clearCartItems() }} >CLEAR CART </button>}
        </div>

        {/* <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Apply Coupon
          </button>
          <br></br>
          <div class="dropdown-menu">
            <input class="dropdown-item" placeholder='Enter Code Here' />
            <span class="dropdown-item" >Apply</span>

          </div>
        </div> */}
       {cartitem.length > 0 && <div className='main-rtg'>

          <div className='rightCart-container'>
            <div className='cont-btn flex'>
              <button onClick={navigateToCart} className='order-btn'>PLACE ORDER</button>
            </div>
            <p className='bill-heading'>BILLING DETAILS</p>

            <div className='bill-details'>
              <div className='ct flex'>
                <p>CART TOTAL</p>
                <p>{totalAmmount}</p>
              </div>
              <div className='ct flex'>
                <p>GST</p>
                <p>{Math.round((totalAmmount * 18) / 100)}</p>
              </div>
              <div className='ct flex'>
                <p>TOTAL AMMOUNT</p>
                <p>{Math.round((totalAmmount + (totalAmmount * 18) / 100))}</p>
              </div>
            </div>
            <div className='cont-btn flex'>
              <button onClick={navigateToCart} className='order-btn'>PLACE ORDER</button></div>

          </div>
        </div>}
      </div>
    </div>
    </>
  )
}
