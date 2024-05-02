import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {

    const { content, destination, label, image } = data;

    return (
        <Row>
            <Col className="p-5 text-center col-8 mx-auto">
                <img src={image} alt="Banner" className="img-fluid" />
                {/* <h1 className='p-3 text-center'>{title}</h1> */}
                <p className='py-3 col-10 mx-auto'>{content}</p>
                <Link className="btn btn-dark" to={destination}>{label}</Link>
            </Col>
        </Row>
    )
}
