import model from "./model.js";
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
 }
 
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(userId, courseId) {
  return model.create({ 
      user: userId, 
      course: courseId,
      status: "ENROLLED",
      enrollmentDate: new Date()
  });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
// in your Enrollments/dao.js
export const findEnrollmentsByCourse = (courseId) => 
  model.find({ course: courseId });