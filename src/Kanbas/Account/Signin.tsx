import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, User } from "./reducer"; // Import User type
import * as db from "../Database"; // Mock database

export default function Signin() {
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      console.error("Invalid username or password");
      return;
    }

    if (["FACULTY", "STUDENT", "ADMIN"].includes(user.role)) {
      dispatch(setCurrentUser(user as User)); 
      navigate("/Kanbas/Dashboard"); 
    } else {
      console.error("Invalid role detected for user:", user.role);
    }
  };

  return (
    <div id="wd-signin-screen" className="signin-container">
      <h1>Sign in</h1>
      <input
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="Username"
        id="wd-username"
      />
      <input
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="Password"
        type="password"
        id="wd-password"
      />
      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100">
        Sign in
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup" className="signup-link">
        Sign up
      </Link>
    </div>
  );
}
