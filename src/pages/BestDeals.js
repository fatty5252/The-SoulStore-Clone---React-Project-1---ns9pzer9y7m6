import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
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
          deals.map((song,index) => (
            <div key={song.id}> {/* Adding key prop for each child in a list */}
              <img onClick={() => nevigateToProductDetails(song._id)} key={index} style={{ width: '95%' }} className="bestdeals-cart-img" src={song.displayImage} alt={song.name} />
              <div>
                <p>{song.name}</p>
                <p>₹ {song.price}</p>
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