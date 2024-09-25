import React from 'react';
import { useState } from 'react';

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

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons" style={{ display: collapsed ? 'none' : 'block' }}>
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons" style={{ display: collapsed ? 'none' : 'block' }}>
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
            </li>
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
