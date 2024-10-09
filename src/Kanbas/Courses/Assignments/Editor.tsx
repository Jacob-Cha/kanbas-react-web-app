import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control id="wd-name" type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={5}
            defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, links to the Kanbas application, links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page."
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control id="wd-points" type="number" defaultValue={100} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select id="wd-group" defaultValue="assignments">
                <option value="assignments">ASSIGNMENTS</option>
                <option value="quizzes">QUIZZES</option>
                <option value="exams">EXAMS</option>
                <option value="projects">PROJECTS</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Display Grade As</Form.Label>
              <Form.Select id="wd-display-grade-as" defaultValue="percentage">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
                <option value="gpa-scale">GPA Scale</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Submission Type</Form.Label>
              <Form.Select id="wd-submission-type" defaultValue="online">
                <option value="online">Online</option>
                <option value="on-paper">On Paper</option>
                <option value="no-submission">No Submission</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Online Entry Options</Form.Label>
              <div>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Upload" />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assign To</Form.Label>
              <Form.Select id="wd-assign-to" defaultValue="everyone">
                <option value="everyone">Everyone</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Due</Form.Label>
              <Form.Control id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Available from</Form.Label>
              <Form.Control id="wd-available-from" type="date" defaultValue="2024-05-06" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Until</Form.Label>
              <Form.Control id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
            <Button variant="success">Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
