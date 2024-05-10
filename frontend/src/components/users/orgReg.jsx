import React, { Fragment, useState, useEffect } from 'react';
import Loader from '../Layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { MdOutlineLockOpen } from 'react-icons/md';
import { MdMailOutline } from 'react-icons/md';
import { MdLockOpen } from 'react-icons/md';
import { MdFace } from 'react-icons/md';
import { orgRegister, clearErrors } from '../../Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const OrgReg = ({ history }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    dispatch(orgRegister(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [alert, isAuthenticated, dispatch, error, navigate]);

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className="col-xxl-8 m-5 mb-xxl-0">
        <div className="container bg-light shadow bg-secondary-soft emp-profile px-4 py-5 rounded">
          <h4 className="mb-4 mt-0">Sign Up!</h4>
          <form encType="multipart/form-data" onSubmit={registerSubmit}>
            <div className="row g-3">
              <hr />

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <div className="input-group shadow">
                  <div className="input-group-prepend">
                    <span className="input-group-text " id="inputGroupPrepend3">
                      <MdMailOutline />
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    required
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
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
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
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={registerDataChange}
                  />
                </div>
              </div>

              {/* Register Button */}
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
              <div className="col-md-12 text-center">
                Already have an account?{' '}
                <Link to="/login/organization">
                  <button className="btn btn-outline-primary">Log in</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OrgReg;
