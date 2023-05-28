import {Navbar, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import Welcome from './pages/welcome/Welcome'
import Login from './pages/login/Login'
import Register from './pages/register/Register';

function App() {
  return (  
    <Router>
    <div>
      <section>
        <Navbar bg="dark" variant='dark'>
          <Container style={{ marginLeft:'20px'}}>
            <Navbar.Brand as={NavLink} to="/">Blog App</Navbar.Brand>
          </Container>
        </Navbar>
      </section>
        <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
    </div>
    </Router>
    
  );
}

export default App;
