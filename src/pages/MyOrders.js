import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import ProductNamesFetcher from '../components/ProductNamesFetcher';
import { Table } from 'react-bootstrap';

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
    }, [user.isAdmin]);

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
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th className='bg-dark text-light'>Order ID</th>
                            <th className='bg-dark text-light'>Total Price</th>
                            <th className='bg-dark text-light'>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>PHP {order.totalPrice}</td>
                                <td>
                                    {order.productsOrdered.map(product => (
                                        <div key={product.productId} style={{ listStyleType: 'none' }}>
                                            <h5><ProductNamesFetcher productIds={[product.productId]} /></h5>
                                            <p>Quantity: {product.quantity}</p>
                                            <p>Subtotal: PHP {product.subtotal}</p>
                                            <hr/>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

