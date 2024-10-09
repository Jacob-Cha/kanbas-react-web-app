import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const courses = [
    {
      id: 1234,
      title: "CS100",
      description: "fundies",
      image: "/images/reacticon.jpg",
    },
    {
      id: 5678,
      title: "CS200",
      description: "fundies 2",
      image: "/images/reacticon.jpg",
    },
    {
      id: 9101,
      title: "CS300",
      description: "ood",
      image: "/images/reacticon.jpg",
    },
    {
      id: 1121,
      title: "CS400",
      description: "Algo",
      image: "/images/reacticon.jpg",
    },
    {
      id: 3141,
      title: "CS500",
      description: "Database",
      image: "/images/reacticon.jpg",
    },
    {
      id: 5161,
      title: "CS600",
      description: "Systems",
      image: "/images/reacticon.jpg",
    },
    {
      id: 7181,
      title: "CS700",
      description: "Computer Networks",
      image: "/images/reacticon.jpg",
    },
  ];

  return (
    <div id="wd-dashboard" style={{ marginLeft: 140, padding: '20px' }}>
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="wd-dashboard-course col"
              style={{ width: '250px' }}
            >
              <div className="card h-100 rounded-3 overflow-hidden">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${course.id}/Home`}
                >
                  <img
                    src={course.image}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '160px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.title}
                    </h5>
                    <p className="wd-dashboard-course-description card-text">
                      {course.description}
                    </p>
                    <button className="btn btn-primary">Go</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
