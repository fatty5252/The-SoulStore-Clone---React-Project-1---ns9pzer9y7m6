// import React, { useState, useEffect } from 'react';

// const BestDealsSection = () => {

//   const [bestDeals, setBestDeals] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const baseUrl = "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products";
//       const sortParam = { sort: '{"price": -1}' };
//       const headers = { projectID: "rhxg8aczyt09" };

//       try {
//         const response = await fetch(`${baseUrl}?${new URLSearchParams(sortParam)}`, { headers });
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setBestDeals(data.data);
//         } else {
//           console.error(`Failed to retrieve best deals. Status code: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
    
//     fetchData();
//   }, []); 

//   return (
//     <div>
//       <h2>Best Deals</h2>
//       <ul>
//         {bestDeals && 
//         bestDeals.map((product,index) => (
//           <li key={index}>
//             <p>Product: {product.name}</p>
//             <p>Price: {product.price}</p>
//           </li>
//         ))
//         }
//       </ul>
//     </div>
//   );
// };

// export default BestDealsSection;

import React, { useState, useEffect } from 'react';


const BestDealsSection = () => {
  const [bestDeals, setBestDeals] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <div className="best-deals-section">
      <h2>Best Deals</h2>
      <div className="slider-container">
        <div className={`slider ${isAnimating ? 'animating' : ''}`}>
          {bestDeals.map((product, index) => (
            <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
              <p>Product: {product.name}</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
        <button className="prev-btn" onClick={handlePrevSlide}>Prev</button>
        <button className="next-btn" onClick={handleNextSlide}>Next</button>
      </div>
    </div>
  );
};

export default BestDealsSection;

