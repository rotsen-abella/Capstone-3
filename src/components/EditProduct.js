import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}){

    const [ productId, setProductId ] = useState("");
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price, setPrice ] = useState(0);
	const [ showEdit, setShowEdit ] = useState(false);

    const openEdit = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/`)
		.then(res => res.json())
		.then(data => {
			
			setProductId(data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

		setShowEdit(true);
	}

    const closeEdit = () => {
		setShowEdit(false);
		setName("");
		setDescription("");
		setPrice(0);
	}

    const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.message === "Product updated successfully") {
				Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Product successfully updated!"
				})
				closeEdit();
				fetchData();
			} else {
				Swal.fire({
					title: "Error!",
					icon: "error",
					text: "Please try again"
				})
				closeEdit();
				fetchData();
			}
		})
	}

    return (
		<>
			<Button variant="primary" size='md' className='mx-2' onClick={() => openEdit(product)}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
			        	<Modal.Title>Update</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<Form.Group className="mb-3" controlId="productName">
			        	        <Form.Label>Name</Form.Label>
			        	        <Form.Control 
			        	        	type="text" 
			        	        	required
			        	        	value={name}
			        	        	onChange={e => setName(e.target.value)}
			        	        />
		        	    </Form.Group>
	    	        	<Form.Group className="mb-3" controlId="productDescription">
	    	        	        <Form.Label>Description</Form.Label>
	    	        	        <Form.Control 
	    	        	        	as="textarea"
	    	        	        	rows={5}
	    	        	        	required
	    	        	        	value={description}
	    	        	        	onChange={e => setDescription(e.target.value)}
	    	        	        />
	            	    </Form.Group>
	    	        	<Form.Group className="mb-3" controlId="productPrice">
	    	        	        <Form.Label>Price</Form.Label>
	    	        	        <Form.Control 
	    	        	        	type="number" 
	    	        	        	required
	    	        	        	value={price}
	    	        	        	onChange={e => setPrice(e.target.value)}
	    	        	        />
	            	    </Form.Group>
			        </Modal.Body>
			        <Modal.Footer>
	                  	<Button variant="secondary" onClick={closeEdit}>Close</Button>
	                  	<Button variant="primary" type="submit">Submit</Button>
	                </Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}