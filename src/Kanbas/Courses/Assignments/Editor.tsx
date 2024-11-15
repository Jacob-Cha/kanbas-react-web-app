import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select the current assignment based on the aid (if it exists)
  const assignment = useSelector((state: any) =>
    state.assignments.assignments.find(
      (assignment: any) => assignment._id === aid && assignment.course === cid
    )
  );

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // Load existing assignment data into form fields if editing
  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description || "");
      setPoints(assignment.points || 100);
      setDueDate(assignment.dueDate || "");
      setAvailableFrom(assignment.availableFrom || "");
      setAvailableUntil(assignment.availableUntil || "");
    }
  }, [assignment]);

  const handleSave = () => {
    const updatedAssignment = {
      _id: aid || new Date().getTime().toString(), // Use existing ID if editing, otherwise generate a new one
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid || "", // Ensure the course ID is set
    };

    if (aid) {
      // If aid exists, we're editing
      dispatch(updateAssignment(updatedAssignment));
    } else {
      // If aid does not exist, we're creating a new assignment
      dispatch(addAssignment(updatedAssignment));
    }

    // Navigate back to the Assignments screen
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    // Navigate back to the Assignments screen without saving
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

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

        <Row className="mb-3">
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
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
