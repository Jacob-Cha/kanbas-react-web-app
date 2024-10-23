import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4">Signup</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="username" 
                style={{ height: '45px', fontSize: '1.2rem' }} // Adjusting size
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                type="password" 
                placeholder="password" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                type="password" 
                placeholder="verify password" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Button type="submit" className="btn btn-primary w-100 mb-3" style={{ height: '50px', fontSize: '1.2rem' }}>
              Signup
            </Button>
          </Form>
          <div className="text-center">
            <Link to="/Kanbas/Account/Signin">Signin</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
