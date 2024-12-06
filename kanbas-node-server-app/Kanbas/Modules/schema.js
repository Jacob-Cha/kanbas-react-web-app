import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: String,
  description: String,
  course: { type: String, required: true }, // Store course.number
  lessons: Array,
}, { collection: "modules" }); // Ensure the collection name matches

export default moduleSchema;
