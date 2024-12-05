// src/Kanbas/Account/Profile.tsx

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import React from "react";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => { 
        if (!currentUser) {
            navigate("/Kanbas/Account/Signin");
            return;
        }
        setProfile(currentUser);
    }, [currentUser, navigate]);

    const updateProfile = async () => {
        try {
            console.log("Updating profile with:", profile); // Log the full profile object
            const updatedProfile = await client.updateUser(profile); // Ensure the full profile is sent
            console.log("Profile updated successfully:", updatedProfile);
            dispatch(setCurrentUser(updatedProfile));
            alert("Profile updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            if (error.response) {
                alert(`Error: ${error.response.data.message || "Server error"}`);
            } else if (error.request) {
                alert("Error: No response from server. Please try again later.");
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };
    
    
    
    

    const signout = async () => {
        try {
            await client.signout();
            dispatch(setCurrentUser(null));
            navigate("/Kanbas/Account/Signin");
        } catch (error: any) {
            alert("Error signing out. Please try again.");
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <input
                        value={profile.username}
                        id="wd-username"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={profile.password}
                        id="wd-password"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        placeholder="Password"
                        required
                    />
                    <input
                        value={profile.firstName}
                        id="wd-firstname"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        placeholder="First Name"
                        required
                    />
                    <input
                        value={profile.lastName}
                        id="wd-lastname"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="date"
                        value={profile.dob}
                        id="wd-dob"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        value={profile.email}
                        id="wd-email"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="Email"
                        required
                    />
                    <select
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="form-control mb-2"
                        id="wd-role"
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
                        Update
                    </button>

                    <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
