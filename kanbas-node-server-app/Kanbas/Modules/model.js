import mongoose from "mongoose";
import moduleSchema from "./schema.js"; // Ensure the correct path

const ModuleModel = mongoose.model("ModuleModel", moduleSchema);

export default ModuleModel;
