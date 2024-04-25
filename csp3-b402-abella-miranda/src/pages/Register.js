import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import Home from "./Home";


export default function Register() {

	const { user } = useContext(UserContext);

	
    const [ firstName, setFirstName] = useState("");
	const [ lastName, setLastName ] = useState("");
	const [ email, setEmail ] = useState("");
    const [ mobileNo, setMobileNo ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ verifyPassword, setVerifyPassword ] = useState("");
	const [ isActive , setIsActive ] = useState(false);

	// console.log(email);
	// console.log(password);
	// console.log(verifyPassword);

	useEffect(() => {
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && verifyPassword !== "") && (password === verifyPassword) && (mobileNo.length === 11)) {

			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password, verifyPassword])


	// Function to register a user
	function registerUser(e) {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data.message === "Registered Successfully") {
				// Clear the input fields
				setFirstName("");
				setLastName("");
				setEmail("");
				setMobileNo("");
				setPassword("");
				setVerifyPassword("");

				Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    text: "Welcome to the SHOP!"
                })
                

			} else if (data.error === "Email invalid") {

				Swal.fire({
                    title: "Email is Invalid!",
                    icon: "error",
                    text: "Check your email and try again."
                })

			} else if (data.error === "Mobile number invalid") {

				Swal.fire({
                    title: "Mobile number is Invalid!",
                    icon: "error",
                    text: "Check your mobile number and try again."
                })

			} else if (data.error === "Password must be at least 8 characters") {

				Swal.fire({
                    title: "Password is Invalid!",
                    icon: "error",
                    text: "Password must be at least 8 characters"
                })
            }else if(data.error === "Email already in use"){
                Swal.fire({
                    title: "Email is already in use!",
                    icon: "error",
                    text: "Email already in use. Please use another email."
                })

			} else {

				alert("Something went wrong");
			}
		})
	}

	return (
		(user.id !== null) 
		?
		    <Home />
		:
        <>
            <Form onSubmit={(e) => registerUser(e)}>
		<h1 className="my-5 text-center">Register</h1>

		<Form.Group className="mb-3" controlId="firstName">
			<Form.Label>First Name</Form.Label>
			<Form.Control 
			type="text" 
			placeholder="Enter First Name" 
			required
			value={firstName}
			onChange={e => {setFirstName(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="lastName">
			<Form.Label>Last Name</Form.Label>
			<Form.Control 
			type="text" 
			placeholder="Enter Last Name" 
			required
			value={lastName}
			onChange={e => {setLastName(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="email">
			<Form.Label>Email:</Form.Label>
			<Form.Control 
			type="email" 
			placeholder="Enter Email"
			required
			value={email}
			onChange={e => {setEmail(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="mobileNo">
			<Form.Label>Mobile No:</Form.Label>
			<Form.Control 
			type="number" 
			placeholder="Enter 11 Digit No." 
			required
			value={mobileNo}
			onChange={e => {setMobileNo(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="password">
			<Form.Label>Password</Form.Label>
			<Form.Control 
			type="password" 
			placeholder="Enter Password" 
			required
			value={password}
			onChange={e => {setPassword(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="confirmPassword">
			<Form.Label>Confirm Password</Form.Label>
			<Form.Control 
			type="password" 
			placeholder="Verify Password" 
			required
			value={verifyPassword}
			onChange={e => {setVerifyPassword(e.target.value)}}
			/>
		</Form.Group>

		{ isActive 
			?
			<Button variant="primary" type="submit">Submit</Button>
			:
			<Button variant="danger" type="submit" disabled>Submit</Button>

		}

		</Form>
        </>
		
        

	)
}