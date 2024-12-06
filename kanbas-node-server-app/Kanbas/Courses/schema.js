import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
    credits: Number,
    description: String,
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "ModuleModel" }],
  },
  { collection: "courses" }
);

export default courseSchema;