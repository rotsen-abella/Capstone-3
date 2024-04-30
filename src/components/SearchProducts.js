import React, { useState } from 'react';
import ProductCard from './ProductCard';

const SearchProduct = () => {
const [searchNameQuery, setSearchNameQuery] = useState('');
const [searchNameResults, setSearchNameResults] = useState([]);


  const handleSearchByName = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchNameQuery })
      });
      const data = await response.json();
      setSearchNameResults(data.products);
      
    } catch (error) {
      console.error('Error searching for products by name:', error);
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <hr></hr>
      
      
      <div>
        <h4>Search by Name</h4>
        <div className="form-group pb-4">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={searchNameQuery}
            onChange={event => setSearchNameQuery(event.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearchByName}>
          Search
        </button>
        {searchNameResults.length > 0 && (
          <>
            <h4>Search Results by Name:</h4>
            <ul>
              {searchNameResults.map(product => (
                <ProductCard productProp={product} key={product._id}/>
              ))}
            </ul>
          </>
        )}
      </div>
      <hr></hr>
    </div>
  );  
};

export default SearchProduct;