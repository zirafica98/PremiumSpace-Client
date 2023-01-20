import React from 'react'
import {useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


export default function HeaderAdmin() {
    let history = useNavigate();


    const logout = () =>{
        localStorage.removeItem("accessToken");
        history("/login");
    }

  return (
    <div className='header-admin'>
     <Navbar expand="lg" >
      <Container>
        <Navbar.Brand href="#home">Admin panel</Navbar.Brand>
        <Navbar.Toggle className="navbar-right pushy pushy-right" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="/productsTable">Proizvodi</Nav.Link>
              <Nav.Link href="/blog">Strucni tekstovi</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary" onClick={logout}>Odjavi se</Button>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
