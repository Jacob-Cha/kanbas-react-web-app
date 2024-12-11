import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { Course } from "./CourseTypes";

export default function Kanbas() {
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };

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
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      console.log("Fetching all courses...");
      const allCourses = await courseClient.fetchAllCourses();
      console.log("All courses fetched:", allCourses);

      console.log("Fetching enrolled courses for user...");
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      console.log("Enrolled courses:", enrolledCourses);

      const enrolledCoursesMap = enrolledCourses.filter(Boolean).reduce(
        (acc: { [key: string]: boolean }, course: { _id: string }) => {
          acc[course._id] = true;
          return acc;
        },
        {} as { [key: string]: boolean }
      );

      const courses = allCourses.map((course: any) => ({
        ...course,
        enrolled: !!enrolledCoursesMap[course._id],
      }));

      console.log("Final courses array:", courses);
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses.filter(Boolean));
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to fetch courses on component load or when currentUser changes
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const addNewCourse = async () => {
    try {
      const newCourse = {
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        department: "D000",
        credits: 0,
        description: "New Description",
      };
      const createdCourse = await courseClient.createCourse(newCourse);
      setCourses([...courses, createdCourse]);
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
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
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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