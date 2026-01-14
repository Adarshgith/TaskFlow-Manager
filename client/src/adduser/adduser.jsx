import React, { useState } from 'react'
import './adduser.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Adduser = () => {
    const users={
        name:"",
        email:"",
        address:""  
    }
    const [user,setUser]=useState(users);
    const navigate=useNavigate();

    // Get API URL from environment variable or use fallback
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    const inputHandler=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);     // it will take name and value from input field
        setUser({...user,[name]:value});  // this is spread operator
    }

    const submitForm= async(e)=>{
        e.preventDefault();
        await axios.post(`${API_URL}/api/users/`, user)
        .then((res)=>{
            console.log(res);
            toast.success(res.data.message, {position:"top-right"});
            navigate("/");
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response?.data?.message || "Error adding user", {position:"top-right"});
        });    
    }

  return (
    <div>
      <div className='adduser'>
        <h3>Add User Form</h3>
        <form onSubmit={submitForm}>
          <div className="inputgroup">
            <label htmlFor='name'>Name:</label>
            <input type="text" id="name" onChange={inputHandler} name="name" placeholder='Enter Name' autoComplete='off' />  
          </div>
          <div className="inputgroup">
            <label htmlFor='email'>Email:</label>
            <input type="email" id="email" onChange={inputHandler} name="email" placeholder='Enter Email' autoComplete='off' />  
          </div>
          <div className="inputgroup">
            <label htmlFor='address'>Address:</label>
            <input type="text" id="address" onChange={inputHandler} name="address" placeholder='Enter Address' autoComplete='off' />  
          </div>
          <button type="submit" className="adduser-btn">Add User</button>
        </form>
      </div>
    </div>
  )
}

export default Adduser;