import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1); 
    const navigate = useNavigate();

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
        if (user.isAdmin) {
            Swal.fire({
                title: "Admins cannot add items to the cart",
                icon: 'warning',
                text: "Please log in as a regular user to add items to the cart"
            });
        } else if (quantity <= 0) {
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
                    
                        
                            productId: productId,
                            quantity: quantity
                        
                    
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

                    navigate("/products");
                    
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
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">{name}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <Card.Text className="fw-bold">Price: ${price}</Card.Text>
                            <hr />
                            <div className="d-flex align-items-center justify-content-center">
                                <Button variant="outline-dark" onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0))}>-</Button>
                                <Form.Control
                                    className="mx-2 text-center"
                                    type="number"
                                    value={quantity}
                                    onChange={e => setQuantity(parseInt(e.target.value))}
                                    style={{width: '80px'}}
                                />
                                <Button variant="outline-dark" onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</Button>
                            </div>
                            <div className="text-center mt-4">
                                {user.id !== null
                                    ? <>
                                        <Button variant="success" onClick={addToCart}>Add to Cart</Button>
                                        
                                    </>
                                    : <Link to="/login" className="btn btn-danger">Log in to Add to Cart</Link>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
