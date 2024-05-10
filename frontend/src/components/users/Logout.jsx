import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { logout } from '../../Actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.get('/api/v2/logout');
        if (response.status === 200) {
          dispatch(logout());
          alert.success('Logged out successfully!');
          navigate("/");
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        alert.error(`Failed to log out: ${error.message}`);
      }
    };

    logoutUser();
  }, [dispatch, alert]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
