import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';


const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-arrow custom-prev-arrow ${className}`}
      style={{ ...style, display: 'block', background: '#FF5733' }} // Custom styling
      onClick={onClick}
    />
  );
};
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-arrow custom-next-arrow ${className}`}
      style={{ ...style, display: 'block', background: '#33FF57' }} // Custom styling
      onClick={onClick}
    />
  );
};


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
  responsive: [

    {

      breakpoint: 1024,

      settings: {

        slidesToShow: 2,

        slidesToScroll: 1,

        infinite: true,

        dots: true

      }

    },

    {

      breakpoint: 600,

      settings: {

        slidesToShow: 1,

        slidesToScroll: 1,

        initialSlide: 1

      }

    }

  ]
};
const BestDealsCarousel = ({ deals }) => {
  const navigate = useNavigate();
  const nevigateToProductDetails = (value) => {
    navigate(`/ProductsDetails?id=${value}`);
  }
  return (
    <div style={{ margin: '30px' }} className="app-container">
      <Slider {...settings}>
        {deals.length > 0 ? (
          deals.map((product,index) => (
            <div key={product.id}> {/* Adding key prop for each child in a list */}
              <img onClick={() => nevigateToProductDetails(product._id)} key={index} style={{ width: '95%' }} className="bestdeals-cart-img" src={product.displayImage} alt={product.name} />
              <div>
                <p>{product.name}</p>
                <Rating name="read-only" value={product.ratings} readOnly />
                <div className="flex">
                  <p className="price">₹ {product.price}</p>
                  <p className="price-cut">₹ {product.price + 100}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        
        )}
      </Slider>
    </div>
  );
};
export default BestDealsCarousel;