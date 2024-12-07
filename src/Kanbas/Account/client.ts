import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `http://localhost:4000/api/users`;


export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findMyCourses = async (userId?: string) => {
  console.log("Calling findMyCourses for userId:", userId);
  try {
    if (!userId) {
      console.log("No user ID provided");
      return [];
    }
    
    const { data } = await axiosWithCredentials.get(
      `${USERS_API}/${userId}/courses`
    );
    console.log("Received course data:", data);
    return data;
  } catch (error) {
    console.error("Error in findMyCourses:", error);
    throw error;
  }
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};
console.log("REMOTE_SERVER:", REMOTE_SERVER);
