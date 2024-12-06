import Database from "../Database/index.js";
import model from "./model.js";
import mongoose from 'mongoose';

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
  // const { modules } = Database;
  // Database.modules = modules.filter((module) => module._id !== moduleId);
 }
 
   
 export async function findModulesForCourse(courseId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid courseId");
    }
    const objectId = mongoose.Types.ObjectId(courseId);
    return await model.find({ course: objectId });
  } catch (error) {
    console.error("Error in findModulesForCourse:", error);
    throw error;
  }
}


export function createModule(module) {
  delete module._id;
  module.course = mongoose.Types.ObjectId(module.course);
  return model.create(module);
  // const newModule = { ...module, _id: Date.now().toString() };
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
 }
 
  export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);

  }
  