import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function ProductNamesFetcher({ productIds }) {
    const [productNames, setProductNames] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductNames();
    }, []);

    const fetchProductNames = () => {
        Promise.all(productIds.map(productId =>
            fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
                .then(res => res.json())
                .then(data => {
                    setProductNames(prevProductNames => ({
                        ...prevProductNames,
                        [productId]: data.product.name
                    }));
                })
                .catch(error => {
                    console.error(`Error fetching product details for product ${productId}:`, error);
                    // Display error message using Swal
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Failed to fetch product details for product ${productId}. Please try again later.`,
                    });
                })
        ))
        .finally(() => setLoading(false));
    };

    return (
        <div>
            {loading ? (
                <p>Loading product names...</p>
            ) : (
                <ul>
                    {productIds.map(productId => (
                        <li key={productId}>
                            {productNames[productId] || `Product Name for ${productId}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductNamesFetcher;
