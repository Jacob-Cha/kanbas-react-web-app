import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

//let currentUser = null;

export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  app.post("/api/users", createUser);

  const deleteUser = (req, res) => {};
  app.delete("/api/users/:userId", deleteUser);

  const findAllUsers = (req, res) => {};
  app.get("/api/users", findAllUsers);

  const findUserById = (req, res) => {};
  app.get("/api/users/:userId", findUserById);

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;

    console.log("Update request received:");
    console.log("User ID:", userId);
    console.log("User Updates:", userUpdates);

    if (!userId || !userUpdates) {
        console.error("Invalid userId or updates");
        return res.status(400).json({ message: "Invalid userId or updates" });
    }

    const updatedUser = dao.updateUser(userId, userUpdates);

    if (!updatedUser) {
        console.error(`User with ID ${userId} not found`);
        return res.status(404).json({ message: "User not found" });
    }

    console.log("User successfully updated:", updatedUser);

    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
};




  
  app.put("/api/users/:userId", updateUser);

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  app.post("/api/users/signin", signin);

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);
}