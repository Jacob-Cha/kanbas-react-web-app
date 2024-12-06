import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `http://localhost:4000/api/modules`;
export const deleteModule = async (moduleId: string) => {
 const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
 return response.data;
};
export const updateModule = async (module: any) => {
    const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return data;
  };

  const axiosWithCredentials = axios.create({ withCredentials: true });

  