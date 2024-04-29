import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    function authenticate(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                retrieveUserDetails(data.accessToken);
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to THE SHOP!"
                });
            } else if (data.error === "No Email Found") {
                Swal.fire({
                    title: "Email not found",
                    icon: "error",
                    text: "Check your email and try again."
                });
            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your login credentials and try again."
                });
            }
        })
        .catch(error => {
            console.error('Error authenticating:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed to authenticate. Please try again."
            });
        });
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        })
        .catch(error => {
            console.error('Error retrieving user details:', error);
        });
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    {user.id !== null && <Navigate to="/products" />}
                    <Form onSubmit={(e) => authenticate(e)}>
                        <h1 className="my-5 text-center p-3">Login</h1>
                        <Form.Group controlId="userEmail" className='pb-3'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className='pb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        { isActive ?
                            <Button variant="primary" type="submit" id="submitBtn">
                                Submit
                            </Button>
                            :
                            <Button variant="danger" type="submit" id="submitBtn" disabled>
                                Submit
                            </Button>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
