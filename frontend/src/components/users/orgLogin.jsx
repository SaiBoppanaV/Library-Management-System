import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { orgLogin,clearErrors } from '../../Actions/userAction'
import { MdMailOutline } from 'react-icons/md'
import { MdLockOpen } from 'react-icons/md'

const OrganizationLogin = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    dispatch(orgLogin(formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [alert, isAuthenticated, dispatch, error]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <h2>Login Now</h2>
        <form className="signUpForm" onSubmit={loginSubmit}>
          <div className="signUpEmail">
            <MdMailOutline />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="signUpPassword">
            <MdLockOpen />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <input type="submit" value="Login" className="signUpBtn" />
          <Link to="/forgotPassword" style={{ fontSize: 'small' }}>
            Forgot Password
          </Link>
          <p>Dont have an account?</p>{' '}
          <Link to="/register/organization">
            <button className="btn btn-outline-danger">Register</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default OrganizationLogin;
