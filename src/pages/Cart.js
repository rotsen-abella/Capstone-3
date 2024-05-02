import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// import UserContext from '../UserContext';

export default function Cart() {
    // const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.orders && data.orders.length > 0) {
                    setCart(data.orders[0]); 
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart:', error);
                setLoading(false);
            });
    };

    const fetchProductDetails = () => {
        if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
            return;
        }
        const productIds = cart.cartItems.map(item => item.productId);
        Promise.all(
            productIds.map(productId =>
                fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
                    .then(res => res.json())
                    .then(data => ({ productId, name: data.product.name }))
                    .catch(error => {
                        console.error('Error fetching product details:', error);
                        return { productId, name: '' };
                    })
            )
        )
            .then(productDetails => {
                const productDetailsObject = productDetails.reduce((acc, curr) => {
                    acc[curr.productId] = curr.name;
                    return acc;
                }, {});
                setProductDetails(productDetailsObject);
            });
    };

    useEffect(() => {
        fetchProductDetails();
    }); 

    const handleRemoveItem = (productId) => {
        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify( {productId} ),
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
              if (data.message === "Item removed from cart successfully") {
                Swal.fire({
                  title: 'Item removed',
                  icon: 'success',
                });
                fetchCart();
                
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'Failed to remove item',
                  icon: 'error',
                });
              }
            })
            .catch((error) => {
              console.log('Error removing item:', error);
              Swal.fire({
                title: 'Error',
                text: 'Failed to remove item',
                icon: 'error',
              });
            });

    };

    const handleCheckout = () => {
        // Implement your checkout logic here
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Order created successfully') {
                    // Clear the cart locally
                    setCart([]);
                    
                } else {
                    console.error('Error in checkout:', data.message);
                }
            })
            .catch(error => {
                console.error('Error in checkout:', error);
            });
    };
    

    return (
        <Container className="mt-5">
            <h1 className="mb-4">My Cart</h1>
            {loading ? (
                <p>Loading...</p>
            ) : cart && cart.cartItems && cart.cartItems.length > 0 ? (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr className='text-center'>
                                <th className='bg-dark text-light'>#</th>
                                <th className='bg-dark text-light'>Product Name</th>
                                <th className='bg-dark text-light'>Quantity</th>
                                <th className='bg-dark text-light'>Subtotal</th>
                                <th className='bg-dark text-light'>Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{productDetails[item.productId] || 'Loading...'}</td>
                                    <td className='text-end'>{item.quantity}</td>
                                    <td className='text-end'>{item.subtotal}</td>
                                    <td className='text-center px-0'>
                                        <Button variant="danger" onClick={() => handleRemoveItem(item.productId)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h4 className='pb-4'>Total Price: {cart.totalPrice}</h4>
                    <Link to="/orders" className="btn btn-dark" onClick={handleCheckout}>Checkout</Link>
                </>
            ) : (
                <h4>No items in your cart.</h4>
            )}
        </Container>
    );
}
