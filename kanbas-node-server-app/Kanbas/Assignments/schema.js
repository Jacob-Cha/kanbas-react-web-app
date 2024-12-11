import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // The ID is stored as a string in the old data
    title: { type: String, required: true }, // Title is required
    course: { type: String, required: true } // Course is stored as a string (e.g., "RS101")
  },
  { collection: "assignments" } // Matches the collection name in your database
);

export default assignmentSchema;
