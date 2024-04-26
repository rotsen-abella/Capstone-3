import React, { useState } from 'react';
import ProductCard from './ProductCard';

const SearchProduct = () => {
  const [searchNameQuery, setSearchNameQuery] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
  const [searchNameResults, setSearchNameResults] = useState([]);
//   const [searchPriceResults, setSearchPriceResults] = useState([]);

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

//   const handleSearchByPriceRange = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByPrice`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ minPrice, maxPrice })
//       });
//       const data = await response.json();
//       setSearchPriceResults(data.products);
//     } catch (error) {
//       console.error('Error searching for products by price range:', error);
//     }
//   };

  return (
    <div>
      <h2>Search</h2>
      <hr></hr>
      
      {/* Search by Name */}
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
                <ProductCard productProp={product} key={product._id} />
              ))}
            </ul>
          </>
        )}
      </div>
      <hr></hr>
      {/* Search by Price Range
      <div>
        <h4 className='pt-4'>Search by Price Range</h4>
        <div className="form-group">
          <label htmlFor="minPrice">Minimum Price:</label>
          <input
            type="number"
            id="minPrice"
            className="form-control"
            value={minPrice}
            onChange={event => setMinPrice(event.target.value)}
          />
        </div>
        <div className="form-group pb-4">
          <label htmlFor="maxPrice">Maximum Price:</label>
          <input
            type="number"
            id="maxPrice"
            className="form-control"
            value={maxPrice}
            onChange={event => setMaxPrice(event.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearchByPriceRange}>
          Search
        </button>
        {searchPriceResults.length > 0 && (
          <>
            <h4>Search Results by Price Range:</h4>
            <ul>
              {searchPriceResults.map(product => (
                <ProductCard productProp={product} key={product._id} />
              ))}
            </ul>
          </>
        )}
      </div> */}
    </div>
  );  
};

export default SearchProduct;