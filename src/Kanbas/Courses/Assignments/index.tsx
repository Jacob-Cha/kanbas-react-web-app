import React, { useState } from "react";
import { Button, InputGroup, FormControl, ListGroup, ProgressBar, Modal } from "react-bootstrap";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FiMoreVertical, FiGrid } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

interface Assignment {
  _id: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  course: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

  const filteredAssignments = assignments.filter(
    (assignment: Assignment) => assignment.course === cid
  );

  const handleDeleteClick = (assignment: Assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id)); // Dispatch delete action
    }
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

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

        {currentUser?.role === "FACULTY" && (
          <Button variant="danger" onClick={() => navigate("AssignmentEditor")}>
            <FaPlus className="me-2" /> Assignment
          </Button>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">ASSIGNMENTS</h5>
        <div className="d-flex align-items-center">
          <ProgressBar now={40} label="40% of Total" style={{ width: '150px' }} />
          {currentUser?.role === "FACULTY" && (
            <Button variant="link" className="p-0 ms-2">
              <FaPlus />
            </Button>
          )}
        </div>
      </div>

      <ListGroup as="ul" id="wd-assignment-list">
        {filteredAssignments.map((assignment: Assignment) => (
          <ListGroup.Item key={assignment._id} as="li" className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FiGrid className="me-2 fs-4" />
              <div>
                <a className="wd-assignment-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                  {assignment.title}
                </a>
                <div className="text-muted">Course: {assignment.course}</div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <BsCheckCircle className="me-3 fs-5 text-success" />
              {currentUser?.role === "FACULTY" && (
                <>
                  <FiMoreVertical className="fs-5 me-3" onClick={() => navigate(`AssignmentEditor/${assignment._id}`)} />
                  <FaTrashAlt
                    className="fs-5 text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(assignment)}
                  />
                </>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
