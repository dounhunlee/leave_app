import React from 'react'

import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from "react-router-dom";

function NavLayout({ authenticate, setAuthenticate }) {

    // 로그아웃 처리 함수
    const handleLogout = () => {
      sessionStorage.removeItem('isAuthenticated');
      setAuthenticate(false);
    };

  return (
    <div>
    <Navbar expand="lg" className="bg-primary-subtle">
      <Container>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Navbar.Brand>연차관리</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
    
        <Nav.Link as={Link} to="/leave_app">
          연차 신청
        </Nav.Link>
        
        <Nav.Link as={Link} to="/leave_src">
          연차 조회
        </Nav.Link>
          {/* <NavDropdown title="업무일지" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/c">
              업무일지 작성
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/d">
              업무일지 조회
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav className="ms-auto">
      {authenticate ? (
        <Button 
          variant="outline-primary" 
          onClick={handleLogout} 
          style={{ width: '100%' }}  
        >
          로그아웃
        </Button>
      ) : (
        <Link to="/login" style={{ width: '100%' }}>
          <Button 
            variant="outline-primary" 
            style={{ width: '100%' }}  
          >
            로그인
          </Button>
        </Link>
      )}
    </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>

     
      <Outlet />
      </div>
  );
}


export default NavLayout
