import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import ProductNamesFetcher from '../components/ProductNamesFetcher';
import { Card } from 'react-bootstrap';

export default function MyOrders() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.isAdmin) {
            fetchAllOrders();
        } else {
            fetchMyOrders();
        }
    }, []);

    const fetchMyOrders = () => {
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

    const fetchAllOrders = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
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
        <div>
            <h1 className="my-4">Orders</h1>
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <div>
                    {orders.map(order => (
                        <Card key={order._id} className="mb-4">
                            <Card.Body>
                                <Card.Title>Order ID: {order._id}</Card.Title>
                                <Card.Text>Total Price: PHP {order.totalPrice}</Card.Text>
                                <Card.Text>Products:</Card.Text>
                                <div className="list-unstyled">
                                    {order.productsOrdered.map(product => (
                                        <li key={product.productId} style={{listStyleType: 'none'}}>
                                            <h5><ProductNamesFetcher productIds={[product.productId]} /></h5>  Quantity: {product.quantity} | Subtotal: PHP  {product.subtotal}
                                        </li>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
