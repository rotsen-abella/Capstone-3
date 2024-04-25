import { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function ProductView(){
    const { user } = useContext(UserContext);

	
	const { productId } = useParams()

	const [ name, setName ] = useState("");
	const [ description, setDescription] = useState("");
	const [ price, setPrice ] = useState(0);

    useEffect(() => {
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

	}, [productId]);

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
                            
                            
                            { user.id !== null
                            	?
                            	<Button variant="success" >Add to Cart</Button>
                            	:
                            	<Link className="btn btn-danger" to="/login">Log in to Add to Cart</Link>

                        	}

                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>

	)
}