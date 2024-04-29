import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import UpdatePassword from '../components/UpdatePassword';

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
                <>
                    <Row>
                        <Col md={12} className="p-5 bg-primary text-white">
                            <h1 className="my-5">Profile</h1>
                            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                            <hr />
                            <h4>Contacts</h4>
                            <ul>
                                <li>Email: {details.email}</li>
                                <li>Mobile No: {details.mobileNo}</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="p-4 m-4 ">
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    <UpdatePassword />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}
