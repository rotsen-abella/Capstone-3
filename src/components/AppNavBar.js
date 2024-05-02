import { useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import UserContext from "../UserContext";

export default function AppNavBar(){

    const { user } = useContext(UserContext);
    
    return(
        <Navbar bg="dark"   data-bs-theme= "dark" expand="lg">
		  <Container fluid>
		  <Navbar.Brand as={Link} to="/">THE SHOP</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
		        <Navbar.Collapse id="basic-navbar-nav" className='text-light'>
		        	<Nav className="ms-auto">
				        <Nav.Link as={NavLink} to="/" className='text-light'>Home</Nav.Link>
						<Nav.Link as={NavLink} to="/products" className='text-light'>Products</Nav.Link>
				        

				        {(user.id !== null)
				        	?
					        	user.isAdmin 
					        	?
					        	<>	
									<Nav.Link as={NavLink} to="/profile" className='text-light'>Profile</Nav.Link>
									<Nav.Link as={NavLink} to="/orders" className='text-light'>All Orders</Nav.Link>
					        		<Nav.Link as={NavLink} to="/logout" className='text-light'>Logout</Nav.Link>
									
					        	</>
					        	:
					        	<>
									<Nav.Link as={NavLink} to="/get-cart" className='text-light'>Cart</Nav.Link>
									<Nav.Link as={NavLink} to="/orders" className='text-light'>Orders</Nav.Link>
						        	<Nav.Link as={NavLink} to="/profile" className='text-light'>Profile</Nav.Link>
						        	<Nav.Link as={NavLink} to="/logout" className='text-light'>Logout</Nav.Link>
					        	</>
				        	:
				        	<>
				        		<Nav.Link as={NavLink} to="/login" className='text-light'>Login</Nav.Link>
				        		<Nav.Link as={NavLink} to="/register" className='text-light'>Register</Nav.Link>
				        	</>

				        }

		        	</Nav>
		         </Navbar.Collapse>
		  </Container>
		</Navbar>
    )
}