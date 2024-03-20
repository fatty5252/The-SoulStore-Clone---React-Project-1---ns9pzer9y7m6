import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();


export const UserProvider=({children})=> {

    const [getToken, setToken] = useState(null);
    const [getName, setName] = useState(null);
    const [token, setNewToken] = useState(localStorage.getItem("token"));
    const [categoryToggle, setCategoryToggle] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [cartitem, setCartItem] = useState([]);
    const [cartItemToggle, setCartItemToggle] = useState(true);
    const [totalAmmount, setTotalAmmount] = useState('');
    const [wishListCount, setWishListCount] = useState(parseInt(localStorage.getItem("wishList")));
    const [cartItemCount, setCartItemCount] = useState (parseInt(localStorage.getItem("cartItem")));
    const [storageData, setStorageData] = useState(JSON.parse(localStorage.getItem("addData")));
   
  
  
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://academics.newtonschool.co/api/v1/ecommerce/cart",
          {
            headers: {
              projectId: "rhxg8aczyt09",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (response.data.status === "success"){
          setCartItem(response.data.data.items);
          setTotalAmmount(response.data.data.totalPrice)
        } 

        // console.log(response);
        //   setProductDetails(response.data.data)
      } catch (err) {
        console.log("Error shows ", err);
      }
    };
    useEffect(() => {
      fetchCartItems();
    }, [cartItemToggle]);

    const TokenHandler=(data)=>{
        setToken(data);
    }

    const NameHandler=(data)=>{
        setName(data);
    }

    const addToWhishList = async (id) => {
      try {
        const response = await axios.patch(
          `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
          {
            "productId": id,                
          },
          {
            headers: {
              projectID: "rhxg8aczyt09",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        // console.log(response);
        setCartItemToggle(!cartItemToggle);
        setWishListCount(wishListCount+1);
      } catch (err) {
        console.log("Error shows ", err);
      }
    };

    const getCategoryImage = (category) => {
      let categorySrc;
      switch (category) {
        case 'hoodie': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Small-Tile-2-hoodies_2_Trx4toT.jpg?format=webp&w=480&dpr=1.0'; break;
        case 'jogger': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Small-Tile-2-joggers_1_SZXFQkB.jpg?format=webp&w=480&dpr=1.0'; break;
        case 'shirt': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Big-Tile-shirts_2_q4sggOO.jpg?format=webp&w=480&dpr=1.0'; break;
        case 'jeans': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Big-Tile-jeans_U3fQIev.jpg?format=webp&w=480&dpr=1.0'; break;
        case 'kurta': categorySrc = 'https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/u/v/m/l-grey-106-yellow-freluro-original-imagc26vdpwxgztu-bb.jpeg?q=70&crop=false'; break;
        case 'kurti': categorySrc = 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTYq_H15g_0PlHTY4U8DHp1mWMjphF1nH-VhUoI7HPrFquL26LaC5XZxjWogEAtjpPU1L-bNxFmXUdHxBoOgIEte5NJaPSrKamWKcysYy1cgTwJopU_ZgKlpw&usqp=CAc'; break;
        case 'pyjamas': categorySrc = 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQTY5C7WOiYQfgUzRNYCBHhPsNlW9oTxqTLsGeP3lsl9CLaJWroUBgW-4huL-nead4x6C_EAbWLuE2JJckO1bRjfPpWtGpWA89Rs_jVO7mVcB6XSftVpzirfQ&usqp=CAc'; break;
        case 'shorts': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Small-Tile-2-shorts_1_RGQTs5F.jpg?format=webp&w=480&dpr=1.0'; break;
        case 'jumpsuit': categorySrc = 'https://assets.ajio.com/medias/sys_master/root/20230628/W2eO/649bf531a9b42d15c90f371c/-473Wx593H-465848242-teal-MODEL.jpg'; break;
        case 'trouser': categorySrc = 'https://assets.ajio.com/medias/sys_master/root/20220323/vOyY/623a1834f997dd03e2262eb1/-473Wx593H-410296814-128-MODEL.jpg'; break;
        case 'tracksuit': categorySrc = 'https://m.media-amazon.com/images/I/71KKwwZWFFL._SY741_.jpg'; break;
        case 'tshirt': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Small-Tile-2-t-shirts_1_DddywCG.jpg?format=webp&w=480&dpr=1.0'; break;
        case 'sweater': categorySrc = 'https://rukminim2.flixcart.com/image/832/832/xif0q/sweater/t/r/8/l-combo-strp-dgry-bk-strp-lgry-rd-neuvin-original-imagtxmtjbhftfrf.jpeg?q=70&crop=false'; break;
        default: categorySrc = '';
      }
      return { categorySrc };
    };

    const object = {
      getToken,
      getName,cartItemToggle, setCartItemToggle,totalAmmount, setTotalAmmount,cartitem, setCartItem,
      token,
      categoryToggle,
      setCategoryToggle,getCategoryImage,
      searchItem,wishListCount, setWishListCount,
      setSearchItem,cartItemCount, setCartItemCount,
      setNewToken,storageData, setStorageData,
      TokenHandler,
      NameHandler,
      addToWhishList
    }

  return (
    <div>
      <UserContext.Provider value={object}>
          { children }
      </UserContext.Provider>
    </div>
  )
}

export function useUser(){
    return useContext(UserContext)
}
