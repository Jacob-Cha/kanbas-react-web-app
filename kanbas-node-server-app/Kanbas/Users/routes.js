import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    try {
      console.log("Finding users for course:", cid);
      // Get all enrollments for this course
      const enrollments = await enrollmentsDao.findEnrollmentsByCourse(cid);
      console.log("Found enrollments:", enrollments);
      
      // Get user details for each enrolled user
      const enrolledUsers = await Promise.all(
        enrollments.map(async (enrollment) => {
          return await dao.findUserById(enrollment.user);
        })
      );
      console.log("Found users:", enrolledUsers);
      res.json(enrolledUsers);
    } catch (error) {
      console.error("Error finding users for course:", error);
      res.status(500).json({ message: "Error finding users" });
    }
  };

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
  
    try {
      const existingUser = await dao.findUserById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      await dao.updateUser(userId, userUpdates);
      const updatedUser = await dao.findUserById(userId);
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = updatedUser;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// In routes.js, modify enrollUserInCourse:
const enrollUserInCourse = async (req, res) => {
  try {
      let { uid, cid } = req.params;
      if (uid === "current") {
          const currentUser = req.session["currentUser"];
          uid = currentUser._id;
      }
      console.log("Enrolling user:", uid, "in course:", cid);
      const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
      console.log("Enrollment status:", status);
      res.json(status);
  } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ message: "Error enrolling user in course" });
  }
};

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
// In your UserRoutes.js, add this temporary route to check session
app.get("/api/session-check", (req, res) => {
  console.log("Current session:", req.session);
  console.log("Current user:", req.session["currentUser"]);
  res.json({
    session: req.session,
    currentUser: req.session["currentUser"]
  });
});
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // Routes
  app.get("/api/users/:uid/courses", findCoursesForUser);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  app.get("/api/users", findAllUsers);
  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
}