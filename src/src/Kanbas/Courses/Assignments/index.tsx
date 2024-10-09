import React from "react";
import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import { ProgressBar } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: '300px' }}>
          <InputGroup.Text>
            <AiOutlineSearch />
          </InputGroup.Text>
          <FormControl
            id="wd-search-assignment"
            placeholder="Search for Assignments"
          />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">ASSIGNMENTS</h5>
        <div className="d-flex align-items-center">
          <ProgressBar now={40} label="40% of Total" style={{ width: '150px' }} />
          <Button variant="link" className="p-0 ms-2">
            <FaPlus />
          </Button>
        </div>
      </div>

      <ListGroup as="ul" id="wd-assignment-list">
        <ListGroup.Item as="li" className="wd-assignment-list-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FiGrid className="me-2 fs-4" />
            <div>
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">
                A1 - ENV + HTML
              </a>
              <div className="text-muted">
                Multiple Modules | <i>Not available until</i> May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <BsCheckCircle className="me-3 fs-5 text-success" />
            <FiMoreVertical className="fs-5" />
          </div>
        </ListGroup.Item>

        <ListGroup.Item as="li" className="wd-assignment-list-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FiGrid className="me-2 fs-4" />
            <div>
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/124">
                A2 - CSS + BOOTSTRAP
              </a>
              <div className="text-muted">
                Multiple Modules | <i>Not available until</i> May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <BsCheckCircle className="me-3 fs-5 text-success" />
            <FiMoreVertical className="fs-5" />
          </div>
        </ListGroup.Item>

        <ListGroup.Item as="li" className="wd-assignment-list-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FiGrid className="me-2 fs-4" />
            <div>
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/125">
                A3 - JAVASCRIPT + REACT
              </a>
              <div className="text-muted">
                Multiple Modules | <i>Not available until</i> May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <BsCheckCircle className="me-3 fs-5 text-success" />
            <FiMoreVertical className="fs-5" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
