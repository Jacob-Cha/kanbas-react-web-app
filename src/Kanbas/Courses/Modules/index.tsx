import React, { useState } from 'react';
import { BsGripVertical } from 'react-icons/bs';
import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>(); 
  const [moduleName, setModuleName] = useState(""); 
  const [collapsed, setCollapsed] = useState(false); 
  const [viewProgress, setViewProgress] = useState(false); 
  const modules = useSelector((state: any) => state.modulesReducer.modules); 
  const { currentUser } = useSelector((state: any) => state.accountReducer); 
  const dispatch = useDispatch();

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

        {currentUser?.role === "FACULTY" && (
          <>
            <button>Publish All</button>
            <button>+ Module</button>
          </>
        )}
      </div>
  
      {currentUser?.role === "FACULTY" && (
        <ModulesControls 
          moduleName={moduleName} 
          setModuleName={setModuleName} 
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }}
        />
      )}
  
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                
                {!module.editing && module.name}
                {module.editing && currentUser?.role === "FACULTY" && (
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
                
                {currentUser?.role === "FACULTY" && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={() => dispatch(deleteModule(module._id))}
                    editModule={() => dispatch(editModule(module._id))}
                  />
                )}
              </div>
  
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
