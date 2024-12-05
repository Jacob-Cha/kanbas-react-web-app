import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer"; // Import your reducer action
import * as client from "./client"; // Import your API client
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", verifyPassword: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password !== user.verifyPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const currentUser = await client.signup({ username: user.username, password: user.password });
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile"); // Navigate to Profile on success
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4">Signup</h3>
          <Form onSubmit={signup}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                style={{ height: "45px", fontSize: "1.2rem" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{ height: "45px", fontSize: "1.2rem" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="verify password"
                value={user.verifyPassword}
                onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
                style={{ height: "45px", fontSize: "1.2rem" }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              style={{ height: "50px", fontSize: "1.2rem" }}
            >
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
