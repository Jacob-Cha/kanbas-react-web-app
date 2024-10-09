import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4">Profile</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control 
                defaultValue="alice" 
                placeholder="username" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                defaultValue="123" 
                type="password" 
                placeholder="password" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                defaultValue="Alice" 
                placeholder="First Name" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                defaultValue="Wonderland" 
                placeholder="Last Name" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                defaultValue="2000-01-01" 
                type="date" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                defaultValue="alice@wonderland.com" 
                type="email" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select 
                defaultValue="FACULTY" 
                style={{ height: '45px', fontSize: '1.2rem' }} 
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </Form.Select>
            </Form.Group>
            <Button variant="danger" className="w-100" style={{ height: '50px', fontSize: '1.2rem' }}>
              Signout
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
