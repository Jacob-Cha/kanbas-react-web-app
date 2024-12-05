

import { BsGripVertical } from "react-icons/bs";
import SearchControls from "./SearchControls";
import AssignmentControls from "./AssignmentsControls";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { deleteAssignment as deleteAssignmentAction, setAssignments } from "./reducer";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import DeleteDialog from "./DeleteDialog";
import { useEffect } from "react";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAssignments = async () => {
      if (cid) {
        const fetchedAssignments = await assignmentsClient.fetchAssignmentsForCourse(cid);
        dispatch(setAssignments(fetchedAssignments));
      }
    };
    loadAssignments();
  }, [cid, dispatch]);

  const handleDelete = async (assignmentId: string) => {
    const success = await assignmentsClient.deleteAssignment(assignmentId);
    if (success) {
      dispatch(deleteAssignmentAction(assignmentId));
    } else {
      alert("Failed to delete the assignment.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="me-3">
      <SearchControls />
      <br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5">
          <div className="d-flex align-items-center justify-content-between wd-assignments-title p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <RiArrowDownSFill className="me-2" />
              <b>ASSIGNMENTS</b>{" "}
            </div>
            {currentUser.role === "FACULTY" && <AssignmentControls />}
          </div>
          <ul className="wd-assignment-list list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-2">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdOutlineAssignment className="me-3 text-success" />
                    <span>
                      <a
                        className="wd-assignment-link text-dark text-decoration-none fw-bold"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                      >
                        {assignment.title}
                      </a>
                      <br />
                      <span className="text-danger">Multiple Modules</span> |
                      <b> Not available until</b>{" "}
                      {formatDate(assignment.availableFrom)} | <b>Due</b>{" "}
                      {formatDate(assignment.dueDate)} | {assignment.points} pts
                    </span>
                    {currentUser.role === "FACULTY" && (
                      <span className="d-flex ms-auto">
                        <FaTrash
                          data-bs-toggle="modal"
                          data-bs-target="#wd-delete-assignment-dialog"
                          className="text-danger me-2 mb-1"
                          onClick={() => handleDelete(assignment._id)}
                        />
                        <DeleteDialog
                          handleDelete={() => handleDelete(assignment._id)}
                        />
                        <LessonControlButtons />
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}