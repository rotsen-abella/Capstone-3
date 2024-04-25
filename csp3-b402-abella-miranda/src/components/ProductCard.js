import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CourseCard ({productProp}) {

 
    const { _id, name, description, price } = productProp;


	return (
		<Card id="courseComponent1">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>Php {price}</Card.Text>
                <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
	)
}