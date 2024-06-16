import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const BestDealsSection = () => {
  const [bestDeals, setBestDeals] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products";
      const sortParam = { sort: '{"price": -1}' };
      const headers = { projectID: "rhxg8aczyt09" };

      try {
        const response = await fetch(`${baseUrl}?${new URLSearchParams(sortParam)}`, { headers });
        
        if (response.ok) {
          const data = await response.json();
          setBestDeals(data.data);
        } else {
          console.error(`Failed to retrieve best deals. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
 
  const handlePrevSlide = () => {
    if (!isAnimating) {
      setCurrentSlide(prevSlide => (prevSlide === 0 ? bestDeals.length - 1 : prevSlide - 1));
    }
  };

  const handleNextSlide = () => {
    if (!isAnimating) {
      setCurrentSlide(prevSlide => (prevSlide === bestDeals.length - 1 ? 0 : prevSlide + 1));
    }
  };

  const nevigateToProductDetails = (value) => {
    navigate(`/ProductsDetails?id=${value}`);
  }


  return (
    <>
    <div className="heading-home">
      <h1>Best Deals</h1>
      </div>
      <div className="bestDeals-cart-container-home bestdeals">
      <div className="slider-container">
        <div className={`slider ${isAnimating ? 'animating' : ''}`}>
          {bestDeals.map((item, index) => (
            <div onClick={() => nevigateToProductDetails(item._id)} key={index} className={`slide ${currentSlide === index ? 'active' : ''} bestDeals-cart-container`}>
              <img className="bestdeals-cart-img" src={item.displayImage} />
              <div className="p">
                <p className='para-description'>{item.name}</p>
                <p className="price">₹ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="prev-btn" onClick={handlePrevSlide}>Prev</button>
        <button className="next-btn" onClick={handleNextSlide}>Next</button>
      </div>
    </div>
    </>
  );
};

export default BestDealsSection;

