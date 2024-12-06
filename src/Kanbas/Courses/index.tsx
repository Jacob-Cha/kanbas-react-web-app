import CoursesNavigation from "./Navigation"; 
import Modules from "./Modules"; 
import Home from "./Home"; 
import { Routes, Route, useParams, useLocation, Navigate } from "react-router";  // Added Navigate
import React, { useEffect, useState } from "react";
import Assignments from "./Assignments"; 
import AssignmentEditor from "./Assignments/Editor"; 
import QuizList from "./Quizzes/QuizList";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizTaker from "./Quizzes/QuizTaker";
import { FaAlignJustify } from "react-icons/fa6"; 
import PeopleTable from "./People/Table"; 
import { useSelector } from "react-redux";
import * as courseClient from "./client";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams(); 
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const { pathname } = useLocation(); 
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === cid);
    if (foundCourse) {
      setCurrentCourse(foundCourse);
    }
  }, [cid, courses]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {currentCourse && currentCourse.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        
        <div className="flex-fill">
          {currentUser?.role === "FACULTY" && (
            <div className="course-edit-controls mb-3">
              <button className="btn btn-primary me-2">Add Course</button>
              <button className="btn btn-warning me-2">Edit Course</button>
              <button className="btn btn-danger">Delete Course</button>
            </div>
          )}
          
          <Routes>
            <Route path="Home" element={<Home currentCourse={currentCourse} />} />
            <Route path="Modules" element={<Modules currentCourse={currentCourse} />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/AssignmentEditor" element={<AssignmentEditor />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<QuizList currentCourse={currentCourse} />} />
            <Route 
              path="Quizzes/new" 
              element={
                currentUser?.role === "FACULTY" ? 
                  <QuizEditor currentCourse={currentCourse} /> : 
                  <Navigate to="../" />
              } 
            />
            <Route 
              path="Quizzes/:quizId/edit" 
              element={
                currentUser?.role === "FACULTY" ? 
                  <QuizEditor currentCourse={currentCourse} /> : 
                  <Navigate to="../" />
              } 
            />
            <Route 
              path="Quizzes/:quizId/take" 
              element={<QuizTaker currentCourse={currentCourse} />} 
            />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}