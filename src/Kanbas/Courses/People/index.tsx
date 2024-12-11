import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import PeopleDetails from "./Details";
import * as coursesClient from "../client";
import * as client from "../../Account/client";

function People() {
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [searchName, setSearchName] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const { cid } = useParams();
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          let data: any[] = [];
          if (cid) {
            data = await coursesClient.findUsersForCourse(cid);
          } else {
            // Fetch all users if cid is not available
            data = await client.findAllUsers();
          }
          setUsers(data);
          setFilteredUsers(data);
        } catch (error) {
          console.error("Error fetching course users:", error);
          setUsers([]);
          setFilteredUsers([]);
        }
      };
      fetchUsers();
    }, [cid]);

  useEffect(() => {
    let filtered = [...users];

    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (searchName) {
      const searchLower = searchName.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower)
      );
    }

    setFilteredUsers(filtered);
  }, [searchName, selectedRole, users]);

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-25 d-inline-block me-2"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="form-select w-25 d-inline-block"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <PeopleTable users={filteredUsers} />
      {window.location.pathname.includes('/Users/') && <PeopleDetails />}
    </div>
  );
}

export default People;