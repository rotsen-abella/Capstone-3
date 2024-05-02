import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import { Container, Row, Col } from 'react-bootstrap';
import Image from '../images/TheShopTr.png';

export default function Home() {
    const data = {
        title: "",
        content: "Welcome to our premier e-commerce platform dedicated to basketball enthusiasts! Dive into our extensive range of cutting-edge basketball shoes, meticulously curated to meet the demands of every player, from aspiring rookies to seasoned pros. Discover the perfect blend of style, technology, and performance as you browse through our collection. Whether you're driving to the hoop or locking down on defense, our selection ensures you're equipped to dominate the game. Elevate your play, elevate your style - shop now and take your game to new heights!",
        destination: "/products",
        label: "SHOP NOW!",
        image: Image
    }

    return (
        <Container fluid className='bg-light'>
            <Row>
                <Col>
                    <Banner data={data}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FeaturedProducts/>
                </Col>
            </Row>
        </Container>
    );
}
