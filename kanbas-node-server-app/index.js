// server/index.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import "dotenv/config";

import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";  // Add this import
import Lab5 from './Lab5/index.js';
import Hello from './hello.js';

const app = express();

// CORS Configuration
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

// Session Configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

// Middleware
app.use(express.json());

// Initialize Routes
UserRoutes(app);
CourseRoutes(app);  // Remove the duplicate CoursesRoutes(app)
ModuleRoutes(app);
AssignmentRoutes(app);  // Add this line
Lab5(app);
Hello(app);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));