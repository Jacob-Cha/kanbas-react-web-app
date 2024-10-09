import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaRegFileAlt, FaCog } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineExport } from "react-icons/ai"; 
import React from "react";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>

      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </button>
        </div>
      </div>

      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaRegFileAlt className="me-2 fs-5" /> View Course Files
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <AiOutlineExport className="me-2 fs-5" /> Export Course Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaCog className="me-2 fs-5" /> Course Settings
      </button>
    </div>
  );
}