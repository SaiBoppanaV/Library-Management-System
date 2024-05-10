import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Fragment } from 'react';
import SideMenu from './SideMenu';

const AddMember = () => {

    const navigate = useNavigate(); 
    const alert=useAlert();
  
 
  
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      confirmPassword: '',
    });
  
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = formData;
  
    const handleChange = (e) => {
      if (e.target.name === 'avatar') {
        setFormData({ ...formData, avatar: e.target.files[0] });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Create form data object to send to the server
      const userData={
          firstName: firstName,
          lastName: lastName,
        
          email:email,
          
          password:password,
        
      }
     
      try {
        const response=await axios.post("/api/v2/addmember",userData)
        alert.success(response.data.message)
        navigate("/members")
        
      } catch (error) {
        alert.error(error.message)
      }
      
      
    };
  
  
  return (
    <Fragment>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-8 mt-5 shadow news-feed">
          <h2>Add Member</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <hr />
            {/* First Name */}
            <div className="col-md-6">
              <label className="form-label">First Name </label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-" id="inputGroupPrepend3">
                    <i className="fa-solid fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required=""
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Last name */}
            <div className="col-md-6">
              <label className="form-label">Last Name *</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-solid fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required=""
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
           
            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-sharp fa-solid fa-envelope" />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder=""
                  required=""
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="col-md-6">
              <label className="form-label">Password *</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-solid fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  required=""
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Confirm Password */}
            <div className="col-md-6">
              <label className="form-label">Confirm Password *</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-solid fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  required=""
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
           
            <div className="col-md-12">
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary btn-block">
               Add 
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
          </div>
         
          </Fragment>
  )
}

export default AddMember