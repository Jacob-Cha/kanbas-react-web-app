// Kanbas/Assignments/routes.js
import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    console.log("Fetching assignments for course:", courseId);
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    console.log("Found assignments:", assignments);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    try {
      const { courseId } = req.params;
      const newAssignment = {
        ...req.body,
        course: courseId
      };
      console.log("Creating new assignment:", newAssignment);
      const created = assignmentsDao.createAssignment(newAssignment);
      res.json(created);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    console.log("Updating assignment:", assignmentId, assignmentUpdates);
    const updated = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(updated);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = assignmentsDao.deleteAssignment(assignmentId);
    res.send(status);
  });
}