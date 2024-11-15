import React, { useState } from 'react';
import { BsGripVertical } from 'react-icons/bs';
import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>(); // Retrieve course ID from the URL
  const [moduleName, setModuleName] = useState(""); // Local state for module name
  const [collapsed, setCollapsed] = useState(false); // UI state for collapse
  const [viewProgress, setViewProgress] = useState(false); // UI state for view progress
  const modules = useSelector((state: any) => state.modulesReducer.modules); // Retrieve modules from Redux store
  const dispatch = useDispatch(); // Get dispatch to call reducer functions

  const progressData = {
    'Week 1': '50%',
    'Week 2': '20%',
  };

  const toggleCollapseAll = () => {
    setCollapsed(!collapsed);
  };

  const handleViewProgress = () => {
    setViewProgress(!viewProgress);
  };

  return (
    <div>
      <div className="course-controls">
        <button onClick={toggleCollapseAll}>
          {collapsed ? 'Expand All' : 'Collapse All'}
        </button>
        <button onClick={handleViewProgress}>
          {viewProgress ? 'Hide Progress' : 'View Progress'}
        </button>
        <button>Publish All</button>
        <button>+ Module</button>
      </div>
  
      {/* Add ModulesControls here */}
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
  
      <br /><br /><br /><br />
  
      {/* Render modules dynamically based on the course ID */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid) // Filter modules by course ID
          .map((module: any) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                
                {/* Module name display and editing */}
                {!module.editing && module.name}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                
                {/* Module control buttons */}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={() => dispatch(deleteModule(module._id))}
                  editModule={() => dispatch(editModule(module._id))}
                />
              </div>
  
              {/* Render lessons dynamically within each module */}
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson.id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name} <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
  
      {viewProgress && (
        <div className="progress-view">
          <h3>Progress Overview</h3>
          <ul>
            {Object.keys(progressData).map((week) => (
              <li key={week}>
                {week}: {progressData[week as keyof typeof progressData]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
