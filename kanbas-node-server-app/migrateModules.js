import mongoose from "mongoose";
import CourseModel from "./Kanbas/Courses/model.js"; // Adjust the path to your Course model
import ModuleModel from "../Modules/model.js";
// Connect to your MongoDB
const mongoURI = "mongodb://localhost:27017/your-database-name"; // Replace with your database URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const migrate = async () => {
  try {
    console.log("Starting migration...");

    // Fetch all modules
    const modules = await ModuleModel.find();
    console.log(`Found ${modules.length} modules to migrate.`);

    for (const module of modules) {
      // Find the course associated with the module
      const course = await CourseModel.findById(module.course);
      if (course) {
        // Update the course field in the module to use the course number
        module.course = course.number;
        await module.save();
        console.log(`Updated module ${module._id} to use course number ${course.number}`);
      } else {
        console.warn(`No course found for module ${module._id}, skipping...`);
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    mongoose.connection.close();
  }
};

migrate();
