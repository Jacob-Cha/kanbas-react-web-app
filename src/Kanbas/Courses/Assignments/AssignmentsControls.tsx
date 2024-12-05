import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/Editor`);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Make the container take full width
  };

  const leftContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const rightContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#aaa',
  };

  const inputStyle: React.CSSProperties = {
    paddingLeft: '30px', // Adjust padding to make space for the icon
    height: 'calc(1.5em + 1.25rem + 2px)', // Matches the height of .btn-lg
    fontSize: '1.25rem', // Matches the font-size of .btn-lg
    borderRadius: '.3rem', // Matches the border-radius of .btn-lg
    width: '400px', // Adjust the width as needed
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap" style={containerStyle}>
      <div style={leftContainerStyle}>
        <div style={inputContainerStyle}>
          <FaMagnifyingGlass style={iconStyle} />
          <input
            type="text"
            style={inputStyle}
            className="form-control"
            placeholder="Search..."
          />
        </div>
      </div>
      <div style={rightContainerStyle}>
        <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </button>
        <button
          id="wd-add-assignment-btn"
          className="btn btn-lg btn-danger me-1"
          onClick={handleAddAssignment}
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
      </div>
    </div>
  );
}