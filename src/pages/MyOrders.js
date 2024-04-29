// Orders.js

import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function MyOrders() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.orders && data.orders.length > 0) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
                // Display error message using Swal
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch orders. Please try again later.',
                });
            });
    };

    return (
        <div className="container">
            <h1 className="mt-4">My Orders</h1>
            {loading ? (
                <p>Loading...</p>
            ) : orders && orders.length > 0 ? (
                <div>
                    {orders.map(order => (
                        <div key={order._id} className="mb-4">
                            <h4>Order ID: {order._id}</h4>
                            <p>Total Price: {order.totalPrice}</p>
                            <h5>Products:</h5>
                            <ul>
                                {order.productsOrdered.map(product => (
                                    <li key={product.productId}>
                                        <p>Product Name: {product.name}</p>
                                        <p>Quantity: {product.quantity}</p>
                                        <p>Price: {product.subtotal}</p>
                                        
                                        
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}
