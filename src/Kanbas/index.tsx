// src/Kanbas/index.tsx

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Ensure you're using react-router-dom
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as userClient from "./Account/client";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";

import { Course } from "./CourseTypes"; // Ensure correct path

export default function Kanbas() {
  // State for all courses
  const [courses, setCourses] = useState<Course[]>([]);
  
  // State for the current course being managed
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D000",
    credits: 0,
    description: "New Description",
  });

  // Accessing the current user from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Function to fetch courses from the backend
  const fetchCourses = async () => {
    try {
      const fetchedCourses = await userClient.findMyCourses();
      setCourses(
        fetchedCourses.map((course: any) => ({
          ...course,
          description: course.description || "No description available",
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to fetch courses when currentUser changes
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  // Function to add a new course
  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  // Function to delete a course
  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Function to update a course
  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => (c._id === course._id ? course : c))
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
