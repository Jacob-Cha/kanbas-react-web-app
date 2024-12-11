import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import mongoose from 'mongoose';
import * as coursesDao from "./dao.js"; // Adjust the path if needed
import CourseModel from "./model.js"; // Adjust the path if needed
import ModuleModel from "../Modules/model.js";
export default function CourseRoutes(app) {

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });
 
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
  
    try {
      // Fetch the course to get its number
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return res.status(404).send({ error: "Course not found" });
      }
  
      console.log("Course found:", course);
  
      // Query modules by course number
      const modules = await ModuleModel.find({ course: course.number }); // Query by course number
      console.log("Modules found:", modules);
  
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules for course:", error.message);
      res.status(500).send({ error: "Failed to retrieve modules" });
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
  
    try {
      // Fetch the course to get its number
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return res.status(404).send({ error: "Course not found" });
      }
  
      console.log("Course found:", course);
  
      // Query modules by course number
      const modules = await ModuleModel.find({ course: course.number }); // Query by course number
      console.log("Modules found:", modules);
  
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules for course:", error.message);
      res.status(500).send({ error: "Failed to retrieve modules" });
    }
  });
  
  
  app.get("/api/courses/:courseId/users", async (req, res) => {
    const { courseId } = req.params;
    try {
      // Get enrollments for this course
      const enrollments = await enrollmentsDao.findEnrollmentsByCourse(courseId);
      // Get user details for each enrolled user
      const enrolledUsers = await Promise.all(
        enrollments.map(async (enrollment) => {
          return await usersDao.findUserById(enrollment.user);
        })
      );
      res.json(enrolledUsers);
    } catch (error) {
      console.error("Error finding users for course:", error);
      res.status(500).json({ message: "Error finding users for course" });
    }
  });


  // ... your existing routes ...

 

  
    
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
      });
    
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
      });
    
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  app.get("/api/users/:userId/courses", (req, res) => {
    const { userId } = req.params;
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.send(courses);
  });
}
