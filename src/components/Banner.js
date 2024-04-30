import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    // console.log(data);
    const {title, content, destination, label} = data;

    return (
        <Row>
            <Col className="p-5 text-center col-8 mx-auto">
                <h1 className='p-3 text-center'>{title}</h1>
                <p className='p-5'>{content}</p>
                <Link className="btn btn-dark" to={destination}>{label}</Link>
            </Col>
        </Row>
    )
}