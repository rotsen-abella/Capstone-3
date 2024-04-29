import { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function CreateProduct() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    function createProduct(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.error === "Product already exists") {
                Swal.fire({
                    title: "Product already exists.",
                    icon: "error",
                    text: data.message
                })
            } else if (data.error === "Failed to save the product") {
                Swal.fire({
                    title: "Unsuccessful Product Creation",
                    icon: "error",
                    text: data.message
                })
            } else {
                Swal.fire({
                    title: "Product Created",
                    icon: "success"
                })
                navigate("/products");
            }
        });
        setName("");
        setDescription("");
        setPrice(0);
    }

    return (
        <>
            {user.isAdmin ? (
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <h1 className="my-5 text-center">Add New Product</h1>
                            <Form onSubmit={createProduct}>
                                <Form.Group>
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => setPrice(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="my-5">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Navigate to="/products" />
            )}
        </>
    );
}
