import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleSearchByName();
    }
  };

  const handleClearResults = () => {
    setSearchNameResults([]);
  };

  return (
    <div>    
      <div>
      <h2 className='py-2'>Search Products</h2>
        <Form.Group className="pb-4" controlId="productName">
          <Form.Control
            type="text"
            value={searchNameQuery}
            onChange={(event) => setSearchNameQuery(event.target.value)}
            onKeyDown={handleKeyDown} // Execute search on Enter key down
            style={{ maxWidth: '200px' }}
          />
        </Form.Group>
        <Button variant="dark" onClick={handleSearchByName}>
          Search
        </Button>
        {searchNameResults.length > 0 && (
          <>
            <h4>Search Results:</h4>
            <ul>
              {searchNameResults.map(product => (
                <ProductCard productProp={product} key={product._id}/>
              ))}
            </ul>
            <Button variant="secondary" onClick={handleClearResults}>Clear Results</Button>
          </>
        )}
      </div>
      <hr />
    </div>
  );  
};

export default SearchProduct;
