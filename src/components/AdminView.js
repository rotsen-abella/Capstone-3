import { useState, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct';
import DeactivateProduct from './DeactivateProduct';

export default function AdminView({ productsData, fetchData }) {

     
    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
            console.log(product)
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td className='text-center'>
                        <EditProduct product={product._id} fetchData={fetchData}/>
                        <DeactivateProduct productId={product._id} isActive={product.isActive} fetchData={fetchData}/>
                        </td> 
                        
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData, fetchData])


    return(
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>

            <Row className='justify-content-center'>
                <Col className='col-auto'>
                    <Link className="btn btn-success mb-5 mx-2" to={`/products/createProduct`}>Add New Product</Link>
                    <Link className="btn btn-dark mb-5 mx-2" to={`/orders`}>All Orders</Link>
                </Col>
            </Row>

            {/* <Button variant="success" className='mb-5 d-block mx-auto'>Add New Product</Button> */}
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}