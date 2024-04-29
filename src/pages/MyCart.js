import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

export default function MyCart() {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, [user]);

    const fetchCart = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }) 
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch cart');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data && data.cart) {
                setCart(data.cart);
            } else {
                setCart([]);
            }
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
        });
    }

    return (
        <div>
            <h1>My Cart</h1>
            <ul>
                {cart.length > 0 ? (
                    cart.map(item => (
                        <li key={item._id}>
                            {/* Display item details */}
                            {item.name} - Quantity: {item.quantity}
                        </li>
                    ))
                ) : (
                    <li>Your cart is empty</li>
                )}
            </ul>
        </div>
    );
}