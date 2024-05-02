import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewProducts(props) {

	const { breakPoint, data } = props;

	const {_id, name, description, price } = data

	return(
		<Col xs={12} md={breakPoint}>
			<Card className="cardHighlight mx-2 bg-dark text-secondary">
			    <Card.Body>
			        <Card.Title className='text-center py-2'>
			        	<Link to={`/products/${_id}`} className="text-light">{name}</Link>
			        </Card.Title>
			        <Card.Text>{description}</Card.Text>
			    </Card.Body>
			    <Card.Footer>
			    	<h5 className="text-center">PHP {price}</h5>
			    	<Link className="btn btn-light text-dark d-block" to={`/products/${_id}`}>Details</Link>
			    </Card.Footer>
			</Card>
		</Col>
	)
}