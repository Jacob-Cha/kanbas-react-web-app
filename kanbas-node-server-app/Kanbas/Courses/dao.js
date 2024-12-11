import model from "./model.js";
import mongoose from "mongoose";

export async function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export async function findAllCourses() {
  return model.find();
}

export async function findModulesForCourse(courseNumber) {
  try {
    console.log("Fetching modules for course number:", courseNumber);
    const modules = await model.find({ course: courseNumber }); // Match by course number
    return modules;
  } catch (error) {
    console.error("Error in findModulesForCourse:", error.message);
    throw error;
  }
}

export async function findCoursesForEnrolledUser(userId) {
  try {
    // You'll need to use MongoDB aggregation or populate to get enrolled courses
    // For now, returning all courses as a temporary solution
    return await model.find();

    // TODO: Implement proper enrollment logic with MongoDB
    // Something like:
    // return await model.find({
    //   _id: { $in: await enrollmentModel.find({ userId }).distinct('courseId') }
    // });
  } catch (error) {
    console.error("Error finding courses for user:", error);
    return [];
  }
}

export async function createCourse(course) {
  // Destructure the _id field from the course object
  const { _id, ...courseWithoutId } = course;

  // Pass the course object without the _id field to Mongoose's create method
  return model.create(courseWithoutId);
}

export async function updateCourse(courseId, courseUpdates) {
  return model.findByIdAndUpdate(courseId, courseUpdates, { new: true });
}