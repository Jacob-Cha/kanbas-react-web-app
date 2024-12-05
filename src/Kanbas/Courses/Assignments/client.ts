import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `http://localhost:4000/api/courses`;
const ASSIGNMENTS_API = `http://localhost:4000/api/assignments`;
const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Fetch all assignments for a specific course
export const fetchAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

// Fetch a single assignment by ID
export const fetchAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

// Create a new assignment for a specific course
export const createAssignment = async (courseId: string, assignment: any) => {
  try {
    const response = await API.post(`/api/courses/${courseId}/assignments`, assignment);
    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};


// Update an existing assignment
export const updateAssignment = async (assignmentId: string, assignmentUpdates: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignmentUpdates);
  return response.data;
};

// Delete an assignment
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.status === 204;
};