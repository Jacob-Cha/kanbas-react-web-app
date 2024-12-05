import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function AssignmentSearchControls() {
  return (
    <div className="input-group" style={{ width: '300px' }}>
      <span className="input-group-text">
        <FaSearch />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
      />
    </div>
  );
}