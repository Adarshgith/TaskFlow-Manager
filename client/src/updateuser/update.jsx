import React, { useEffect, useState } from "react";
import "./update.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Updateuser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams(); // to set the id from url

  // Get API URL from environment variable or use fallback
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // it will take name and value from input field
    setUser({ ...user, [name]: value }); // this is spread operator
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching user data", { position: "top-right" });
      });
  }, [id, API_URL]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`${API_URL}/api/users/${id}`, user)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Error updating user", { position: "top-right" });
      });
  };

  return (
    <div>
      <div className="adduser">
        <h3>Update User Form</h3>
        <form onSubmit={submitForm}>
          <div className="inputgroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={user.name}   // set the initial value of the user to be updated
              onChange={inputHandler}
              name="name"
              placeholder="Enter Name"
              autoComplete="off"
            />
          </div>
          <div className="inputgroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={inputHandler}
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
            />
          </div>
          <div className="inputgroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={user.address}
              onChange={inputHandler}
              name="address"
              placeholder="Enter Address"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="adduser-btn">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updateuser;