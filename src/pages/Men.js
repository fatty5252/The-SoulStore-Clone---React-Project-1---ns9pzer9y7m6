import "../styles/Men.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";




export default function Men() {

  const [getData, setData] = useState([]);
  const [getcategory, setCategory] = useState([]);

  useEffect(()=>{
    mensList();
  },[])

  const mensList = async()=>{
    try {
      const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=50",{
        headers: {
          projectId: "rhxg8aczyt09"
        }
      });
      // console.log(responce.data.data);
      setData(responce.data.data)
    }
    catch(err){
      console.log("Error shows ", err);
    }
  }

  const navigate = useNavigate();

  const nevigateToProductDetails=(value)=>{
       navigate(`/Men/ProductsDetails?id=${value}`);
  }
  const nevigateToProductCategory=(value)=>{
       navigate(`/ProductList?category=${value}`);
  }

  useEffect(() => {
    const mensCategory = async () => {

      try {
        const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories", {
          headers: {
            projectId: "rhxg8aczyt09"
          }
        });
        console.log(responce.data.data);
        setCategory(responce.data.data)
      }
      catch (err) {
        console.log("Error shows ", err);
      }
    }
    mensCategory();

  }, [])



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
      case 'trouser': categorySrc = 'https://assets.ajio.com/medias/sys_master/root/20220323/vOyY/623a1834f997dd03e2262eb1/-473Wx593H-410296814-128-MODEL.jpg';  break;
      case 'tracksuit': categorySrc = 'https://m.media-amazon.com/images/I/71KKwwZWFFL._SY741_.jpg';  break;
      case 'tshirt': categorySrc = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Men-Small-Tile-2-t-shirts_1_DddywCG.jpg?format=webp&w=480&dpr=1.0';  break;
      case 'sweater': categorySrc = 'https://rukminim2.flixcart.com/image/832/832/xif0q/sweater/t/r/8/l-combo-strp-dgry-bk-strp-lgry-rd-neuvin-original-imagtxmtjbhftfrf.jpeg?q=70&crop=false';  break;
      default: categorySrc = '';
    }
    return { categorySrc };
};




// console.log("men component loaded");
  return (
    <>
    <div className='men-container'>
    <div >
      <img className='container' src='/images/banne1.webp'/>
      </div>
      <div className='heading'>
      <h1>PRODUCTS</h1>
      </div>
      <div className="main-cart-container">
    { getData.map((item,index)=>item.sellerTag==="trending" && (
      <div onClick={()=>nevigateToProductDetails(item._id)} key={index} className='cart-container'>
      <img className="cart-img" src={item.displayImage}/>
      <div className="p">
      <p className='description'>{item.description}</p>
      <p className='title'>{item.subCategory}</p>
      <p className='title'>{item.sellerTag}</p>
      <p className="price">₹ {item.price}</p>
      </div>
     </div>
    ))
    }
    </div> 
    <div className='heading'>
      <h1>CATEGORIES</h1>
      </div>
    <div className="main-cart-container">
    {getcategory && getcategory.map((item,index)=>(
      <div onClick={()=>nevigateToProductCategory(item)} key={index} className='cart-container'>
      <img className="cart-img" src={getCategoryImage(item).categorySrc}/>
      <div className="p">
      <p className='description'>{item}</p>
      </div>
     </div>
    ))
    }
    </div> 
    </div>
    </>
  )
}
