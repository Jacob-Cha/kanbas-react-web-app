import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";



import { Course } from "./CourseTypes"; // import the unified interface

interface DashboardProps {
  courses: Course[]; // Add this line
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  addNewCourse: () => Promise<void>; // Adjust return types if necessary
  deleteCourse: (courseId: string) => Promise<void>; // Adjust return types if necessary
  updateCourse: () => Promise<void>; // Adjust return types if necessary
}

export default function Dashboard({
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const [courses, setCourses] = useState<Course[]>([]);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    const fetchCourses = async () => {
      if (currentUser) {
        const userId = currentUser._id || "current";
        const response = await fetch(`/api/users/${userId}/courses`);
        if (response.ok) {
          const coursesData = await response.json();
          setCourses(coursesData);
        } else {
          console.error("Failed to fetch courses");
        }
      }
    };

    fetchCourses();
  }, [currentUser]);

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
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
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
                {isFaculty && (
                  <div className="card-body">
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
