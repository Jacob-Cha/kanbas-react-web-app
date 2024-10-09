import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap"; 
export default function Signin() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={3} className="d-none d-md-block">
          <div className="text-center mb-4">
            <img src="/path-to-logo" alt="Logo" className="img-fluid mb-4" />
          </div>
          <nav className="nav flex-column">
            <Link to="/Kanbas/Account" className="nav-link text-center text-dark">
              <i className="bi bi-person-circle"></i> {/* Add any appropriate icon */}
              <span className="d-block">Account</span>
            </Link>
            <Link to="/Kanbas/Dashboard" className="nav-link text-center text-dark">
              <i className="bi bi-speedometer2"></i>
              <span className="d-block">Dashboard</span>
            </Link>
          </nav>
        </Col>

        <Col md={6} className="mx-auto">
          <h1 className="mb-4">Signin</h1>
          <Form>
            <Form.Group controlId="wd-username" className="mb-3">
              <Form.Control type="text" placeholder="username" />
            </Form.Group>
            <Form.Group controlId="wd-password" className="mb-3">
              <Form.Control type="password" placeholder="password" />
            </Form.Group>
            <Button type="submit" className="btn btn-primary w-100 mb-3">
              Signin
            </Button>
          </Form>
          <div className="text-center">
            <Link to="/Kanbas/Account/Signup">Signup</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
