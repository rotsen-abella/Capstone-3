import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import CreateProduct from './pages/CreateProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import { UserProvider } from './UserContext';
import MyCart from './pages/MyCart';

function App() {
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  // Function for clearing the localStorage
  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    // console.log(user)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if(data.user) {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            }) 
        } else {
            setUser({
                id: null,
                isAdmin: null
            })
        }

    })
  }, [])


  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
            <Container fluid>
                <AppNavBar />
                <Routes>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/products" element={<Products />}/>
                    <Route path="/products/:productId" element={<ProductView />}/>
                    <Route path="/products/createProduct" element={<CreateProduct />} />
                    <Route path="/" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/logout" element={<Logout />}/>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/get-cart" element={<MyCart />} />
                    
                </Routes>
            </Container>
        </Router>
    </UserProvider>
  );
}

export default App;