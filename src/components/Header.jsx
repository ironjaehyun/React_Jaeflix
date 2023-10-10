import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { NavbarBrand } from 'react-bootstrap';

function NavScrollExample() {
  return (
    <div>
    
    
    <Navbar expand="lg" className="Nav" bg='dark' data-bs-theme="dark">
      <Container fluid>
      
      <img src='/img/Jaeflix.png' className='title' href='/'></img>
      
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className='link-item'>Home</Link>
            <Link to="/" className='link-item'>Movies</Link>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavScrollExample;