import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../../Actions/userAction';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import SideMenu from './SideMenu';

const UpdateUser = () => {
    const dispatch=useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
    };

    try {
      const response = await axios.put(`/api/v2/updatemember/${id}`, userData);
      alert.success(response.data.message);
      navigate("/home")
      setFirstName("");
      setLastName("");
      setEmail("");
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
          <h2 className="m-2">Update Profile</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
            <label className="form-label">First Name</label>
            <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend1">
                    <i className="fa-solid fa-pen" />
                  </span>
                </div>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend1">
                    <i className="fa-solid fa-pen" />
                  </span>
                </div>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend1">
                    <i className="fa-solid fa-envelope" />
                  </span>
                </div>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          </div>
    
      <button type="submit" className='btn btn-primary px-5'>Update</button>
    </form>
    </div>
    </div>
    </div>
    </Fragment>
  );
};

export default UpdateUser;
