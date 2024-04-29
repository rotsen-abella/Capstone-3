import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button, FormLabel, FormControl } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView(){
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1); // Initialize quantity state with 1

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [productId]);

    const addToCart = () => {
        if (quantity <= 0) {
            Swal.fire({
                title: "Invalid Quantity",
                icon: 'warning',
                text: "Quantity cannot be 0. Please add quantity"
            });
        } else {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    cartItems: [
                        {
                            productId: productId,
                            quantity: quantity
                        }
                    ]
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Item added to cart successfully') {
                    Swal.fire({
                        title: "Successfully Added to cart!",
                        icon: 'success',
                        text: "You have successfully added this item to your cart."
                    });
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: 'error',
                        text: "Please try again."
                    });
                }
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
                Swal.fire({
                    title: "Error",
                    icon: 'error',
                    text: "Failed to add item to cart. Please try again."
                });
            });
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <FormLabel className='me-2'>Quantity:</FormLabel>
                            <div className='d-flex justify-content-center mb-2'>
                                <Button variant='dark' onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0))}>-</Button>
                                <FormControl className='text-center'
                                    type='number'
                                    required
                                    value={quantity}
                                    onChange={e => setQuantity(parseInt(e.target.value))}
                                    style={{width: '100px'}}
                                />
                                <Button variant='dark' onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</Button>
                            </div>
                            
                            {user.id !== null
                                ?
                                <Button variant="success" onClick={addToCart}>Add to Cart</Button>
                                :
                                <Link className="btn btn-danger" to="/login">Log in to Add to Cart</Link>
                            }

                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
