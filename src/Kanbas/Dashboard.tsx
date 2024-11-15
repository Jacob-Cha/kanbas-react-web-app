import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { enroll, unenroll, toggleCourseView } from "./enrollmentsReducer";

interface Course {
  _id: string;
  name: string;
  description: string;
}

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const enrollments = useSelector((state: RootState) => state.enrollments.enrollments);
  const showAllCourses = useSelector((state: RootState) => state.enrollments.showAllCourses);

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const handleToggleView = () => {
    dispatch(toggleCourseView());
  };

  const handleEnrollToggle = (courseId: string) => {
    if (enrollments[courseId]) {
      dispatch(unenroll(courseId));
    } else {
      dispatch(enroll(courseId));
    }
  };

  const filteredCourses = isFaculty
    ? courses // Faculty sees all courses
    : showAllCourses
    ? courses // Students see all courses when toggled
    : courses.filter((course) => enrollments[course._id]); // Students see only enrolled courses by default

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
      )}

      {isStudent && (
        <button className="btn btn-primary float-end mb-3" onClick={handleToggleView}>
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

      {isFaculty && (
        <>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img src="/images/reactjs.jpg" width="100%" height={160} alt="Course" />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                  </div>
                </Link>
                <div className="card-body">
                  {isFaculty && (
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                  )}
                  {isStudent && (
                    <button
                      className={`btn ${
                        enrollments[course._id] ? "btn-danger" : "btn-success"
                      }`}
                      onClick={() => handleEnrollToggle(course._id)}
                    >
                      {enrollments[course._id] ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
