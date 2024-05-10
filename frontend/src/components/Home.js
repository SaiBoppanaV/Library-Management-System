import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SideMenu from './users/SideMenu';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector(state => state.user);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v2/profile/${user.user._id}`);
        setProfile(response.data);
       
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [user.user._id]);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideMenu />
          </div>
          <div className="col-md-8 mt-5 shadow news-feed">
            <h2 className="m-2">Home</h2>
            <div className="row m-1">
              <div className="col-md-4 text-center py-5 text-light shadow bg-secondary" style={{ borderRadius: "4px" }}>
                {profile && (
                  <Fragment>
<h5>Name: {profile.user.firstName ? `${profile.user.firstName} ${profile.user.lastName}` : "Admin"}</h5>
                    <h6>Email: {profile.user.email}</h6>
                    <Link to={`/updateUser/${user.user._id}`}>
                      <button className="mt-1 btn btn-primary">Update</button>
                    </Link>
                  </Fragment>
                )}
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4" style={{ fontSize: "200px" }}>
                <i className="fa-solid fa-book-open-reader"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
