import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard ({productProp}) {

 
    const { _id, name, description, price } = productProp;


	return (
		<Card id="productComponent" className='col-md-8 mb-3 mx-auto bg-dark text-light border border-dark'>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <hr/>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>Php {price}</Card.Text>
                <Link className="btn btn-secondary text-light" to={`/products/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
	)
}