import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Module type
interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: any[];
  editing?: boolean;
}

// Define the initial state type
interface ModulesState {
  modules: Module[];
}

// Initialize the state
const initialState: ModulesState = {
  modules: [], // Start with an empty array
};

// Create the slice
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      // Populate modules from the server response
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules.push(action.payload); // Add a new module to the state
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((module) => module._id !== action.payload);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id ? action.payload : module
      );
      
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
          m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
  },
  },
});

// Export the actions
export const { setModules, addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;

// Export the reducer
export default modulesSlice.reducer;

// Define async functions for interacting with the backend
export const fetchModulesForCourse = (courseId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`/api/courses/${courseId}/modules`);
    dispatch(setModules(response.data)); // Populate Redux state with modules from the server
  } catch (error) {
    console.error("Error fetching modules:", error);
  }
};

export const createModuleForCourse = (courseId: string, module: Module) => async (dispatch: any) => {
  try {
    const response = await axios.post(`/api/courses/${courseId}/modules`, module);
    dispatch(addModule(response.data)); // Add the new module to Redux state
  } catch (error) {
    console.error("Error creating module:", error);
  }
};

export const deleteModuleById = (moduleId: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/api/modules/${moduleId}`);
    dispatch(deleteModule(moduleId)); // Remove the module from Redux state
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

export const updateModuleById = (moduleId: string, moduleUpdates: Partial<Module>) => async (dispatch: any) => {
  try {
    const response = await axios.put(`/api/modules/${moduleId}`, moduleUpdates);
    dispatch(updateModule(response.data)); // Update the module in Redux state
  } catch (error) {
    console.error("Error updating module:", error);
  }
};
