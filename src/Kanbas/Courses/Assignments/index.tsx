import React from "react";
import { Button, InputGroup, FormControl, ListGroup, ProgressBar } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FiMoreVertical, FiGrid } from "react-icons/fi";
import { useParams } from "react-router-dom";
import * as db from "../../Database";
import { useSelector } from "react-redux";

export default function Assignments() {
  const { cid } = useParams(); 
  const assignments = db.assignments.filter(
    (assignment: any) => assignment.course === cid
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user info

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

        {/* Show Add Group and Add Assignment buttons only for FACULTY */}
        {currentUser?.role === "FACULTY" && (
          <div>
            <Button variant="secondary" className="me-2">
              <FaPlus className="me-2" /> Group
            </Button>
            <Button variant="danger">
              <FaPlus className="me-2" /> Assignment
            </Button>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">ASSIGNMENTS</h5>
        <div className="d-flex align-items-center">
          <ProgressBar now={40} label="40% of Total" style={{ width: '150px' }} />
          {/* Show button to add a new assignment to the progress bar only for FACULTY */}
          {currentUser?.role === "FACULTY" && (
            <Button variant="link" className="p-0 ms-2">
              <FaPlus />
            </Button>
          )}
        </div>
      </div>

      <ListGroup as="ul" id="wd-assignment-list">
        {assignments.map((assignment) => (
          <ListGroup.Item key={assignment._id} as="li" className="wd-assignment-list-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FiGrid className="me-2 fs-4" />
              <div>
                <a className="wd-assignment-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                  {assignment.title}
                </a>
                <div className="text-muted">
                  Course: {assignment.course}
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <BsCheckCircle className="me-3 fs-5 text-success" />
              
              {/* Show more options only for FACULTY */}
              {currentUser?.role === "FACULTY" && (
                <FiMoreVertical className="fs-5" />
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
