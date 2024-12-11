import React from "react";
import Modules from "../Modules";
import CourseStatus from "./Status";

interface HomeProps {
  currentCourse: any;  // You can make this more specific by using your Course type
}

export default function Home({ currentCourse }: HomeProps) {  // Add the prop here
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules currentCourse={currentCourse} />  {/* Pass the prop to Modules */}
      </div>
      <div className="d-none d-md-block">
        <CourseStatus currentCourse={currentCourse} />  {/* Pass the prop to CourseStatus */}
      </div>
    </div>
  );
}