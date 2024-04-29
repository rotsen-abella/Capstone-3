import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import Home from "./Home";


export default function Register() {

    const { user } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            mobileNo !== "" &&
            password !== "" &&
            verifyPassword !== "" &&
            password === verifyPassword &&
            mobileNo.length === 11
        );
    }, [firstName, lastName, email, mobileNo, password, verifyPassword]);

    function registerUser(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Registered Successfully") {
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setVerifyPassword("");
                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    text: "Welcome to the SHOP!"
                });
            } else if (data.error === "Email invalid") {
                Swal.fire({
                    title: "Email is Invalid!",
                    icon: "error",
                    text: "Check your email and try again."
                });
            } else if (data.error === "Mobile number invalid") {
                Swal.fire({
                    title: "Mobile number is Invalid!",
                    icon: "error",
                    text: "Check your mobile number and try again."
                });
            } else if (data.error === "Password must be at least 8 characters") {
                Swal.fire({
                    title: "Password is Invalid!",
                    icon: "error",
                    text: "Password must be at least 8 characters"
                });
            } else if (data.error === "Email already in use") {
                Swal.fire({
                    title: "Email is already in use!",
                    icon: "error",
                    text: "Email already in use. Please use another email."
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Registration failed. Please try again later."
                });
            }
        })
        .catch(error => {
            console.error('Error registering user:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed to register user. Please try again."
            });
        });
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    {user.id !== null && <Home />}
                    <Form onSubmit={(e) => registerUser(e)}>
                        <h1 className="my-5 text-center">Register</h1>
                        <Form.Group controlId="firstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                required
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="lastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                required
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="mobileNo" className="mb-3">
                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter 11 Digit No."
                                required
                                value={mobileNo}
                                onChange={e => setMobileNo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Verify Password"
                                required
                                value={verifyPassword}
                                onChange={e => setVerifyPassword(e.target.value)}
                            />
                        </Form.Group>
                        {isActive ?
                            <Button variant="primary" type="submit">Submit</Button>
                            :
                            <Button variant="danger" type="submit" disabled>Submit</Button>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
