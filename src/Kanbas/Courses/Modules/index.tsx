import React, { useState } from 'react';
import { BsGripVertical } from 'react-icons/bs';
import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';
import { useParams } from "react-router";
import * as db from "../../Database"; // Assuming this is your database

export default function Modules() {
  const { cid } = useParams<{ cid: string }>(); // Retrieve course ID from the URL
  const modules = db.modules; // Assuming modules are available in db.modules
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

      {/* Render modules dynamically based on the course ID */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid) // Filter modules by course ID
          .map((module: any) => (
            <li key={module.id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {module.name} <ModuleControlButtons />
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
