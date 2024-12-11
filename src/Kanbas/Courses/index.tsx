import CoursesNavigation from "./Navigation"; 
import Modules from "./Modules"; 
import Home from "./Home"; 
import { Routes, Route, useParams, useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import Assignments from "./Assignments"; 
import AssignmentEditor from "./Assignments/Editor"; 
import { FaAlignJustify } from "react-icons/fa6"; 
import PeopleTable from "./People/Table"; 
import { useSelector } from "react-redux";
import * as courseClient from "./client";
import People from "./People";  // Add this import


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams(); 
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const { pathname } = useLocation(); 
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    // Find the course in the passed courses prop first
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
  <Route path="Modules" element={<Modules currentCourse={currentCourse} />} />  {/* Add currentCourse here */}
  <Route path="Assignments" element={<Assignments />} />
  <Route path="Assignments/AssignmentEditor" element={<AssignmentEditor />} />
  <Route path="Assignments/:aid" element={<AssignmentEditor />} />
  <Route path="People" element={<People />} /> {/* Change this line */}
          </Routes>
        </div>
      </div>
    </div>
  );
}