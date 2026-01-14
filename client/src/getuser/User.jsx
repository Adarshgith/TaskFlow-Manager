import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  // Get API URL from environment variable or use fallback
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users", { position: "top-right" });
      }
    };
    fetchData();
  }, [API_URL]);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/users/${id}`
      );
      setUsers(users.filter((user) => user._id !== id));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user", { position: "top-right" });
    }
  };

  return (
    <div className="user-table-container m-4">
      <Link to="/add" className="btn btn-success mb-3">
        Add User
      </Link>
      <table className="table user-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <Link
                    to={`/update/` + user._id}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;