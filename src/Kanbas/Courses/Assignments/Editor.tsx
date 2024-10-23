import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database"; 

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid && assignment.course === cid
  ); 

  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [points, setPoints] = useState(100); 
  const [dueDate, setDueDate] = useState("2024-05-13"); 
  const [availableFrom, setAvailableFrom] = useState("2024-05-06");

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription("The assignment is available online.\nSubmit a link to the landing page of your Web application running on Netlify. The landing page should include the following:\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.");
    }
  }, [assignment]); 

  if (!assignment) {
    return <p>Assignment not found!</p>;
  }

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Form>
        {}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        {}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control
                id="wd-points"
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))} 
              />
            </Form.Group>
          </Col>
        </Row>

        {}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assign To</Form.Label>
              <Form.Control
                type="text"
                value="Everyone"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Due</Form.Label>
              <Form.Control
                id="wd-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Available from</Form.Label>
              <Form.Control
                id="wd-available-from"
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Until</Form.Label>
              <Form.Control
                id="wd-available-until"
                type="date"
                value={dueDate}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {}
        <Row className="mt-3">
          <Col>
            {}
            <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
              <Button variant="secondary" className="me-2">Cancel</Button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
              <Button variant="success">Save</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
