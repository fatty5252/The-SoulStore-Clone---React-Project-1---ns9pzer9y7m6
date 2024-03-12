import React, { useState, useEffect } from 'react';

const BestDealsSection = () => {

  const [bestDeals, setBestDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products";
      const sortParam = { sort: '{"price": -1}' };
      const headers = { projectID: "rhxg8aczyt09" };

      try {
        const response = await fetch(`${baseUrl}?${new URLSearchParams(sortParam)}`, { headers });
        
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  return (
    <div>
      <h2>Best Deals</h2>
      <ul>
        {bestDeals && 
        bestDeals.map((product,index) => (
          <li key={index}>
            <p>Product: {product.name}</p>
            <p>Price: {product.price}</p>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default BestDealsSection;
