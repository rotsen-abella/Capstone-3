import { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';


export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.user._id) {
                setDetails(data.user);
            } else if (data.error === "User not found") {
                Swal.fire({
                    title: "User not found",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            }
        });
    }, []);

    return (
        <>
            {user.id === null ? (
                <Navigate to="/login" />
            ) : (
                <Container className='bg-dark my-5 border rounded'>
                    <Row>
                        <Col md={12} className="p-5 text-white">
                            <h1 className="my-5">Profile</h1>
                            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                            <hr />
                            <h4>Contacts</h4>
                            <ul>
                                <li>Email: {details.email}</li>
                                <li>Mobile No: {details.mobileNo}</li>
                            </ul>
                            <Link to="/change-password">
                                <Button variant="secondary">Update Password</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}
