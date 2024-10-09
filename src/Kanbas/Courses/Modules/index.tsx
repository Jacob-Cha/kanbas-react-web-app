import React from 'react';
import { useState } from 'react';
import { BsGripVertical } from 'react-icons/bs';
import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';

export default function Modules() {
  const [collapsed, setCollapsed] = useState(false);
  const [viewProgress, setViewProgress] = useState(false);

  const progressData = {
    'Week 1': '50%',
    'Week 2': '20%'
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

      <ModulesControls /><br /><br /><br /><br />
  <ul id="wd-modules" className="list-group rounded-0">
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
      <BsGripVertical className="me-2 fs-3" />
Week 1 
<ModuleControlButtons />
</div>
      <ul className="wd-lessons list-group rounded-0">
        <li className="wd-lesson list-group-item p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />

          LEARNING OBJECTIVES </li>
          <LessonControlButtons />

        <li className="wd-lesson list-group-item p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />

          Introduction to the course </li>
          <LessonControlButtons />

        <li className="wd-lesson list-group-item p-3 ps-1">
          Learn what is Web Development </li>
        <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 1 </li>
        <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 2 </li>
      </ul>
    </li>
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
      <ul className="wd-lessons list-group rounded-0">
        <li className="wd-lesson list-group-item p-3 ps-1">
          LEARNING OBJECTIVES </li>
        <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 1 </li>
        <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 2 </li>
      </ul>
    </li>
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
