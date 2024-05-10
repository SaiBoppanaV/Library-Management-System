import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../users/SideMenu';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const Members = () => {
  const [members, setMembers] = useState([]);
  const { user } = useSelector(state => state.user);
  const alert = useAlert();

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/v2/members');
      const data = response.data;
      setMembers(data);
      
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (memberID) => {
    try {
      const response = await axios.delete(`/api/v2/deletemember/${memberID}`);
      if (response.status === 201) {
        alert.success('Member deleted successfully!');
        fetchMembers();
      } else {
        const error = response.data.message;
        alert.error(error);
      }
    } catch (error) {
      alert.error('An error occurred while deleting the member.');
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideMenu />
          </div>
          <div className="col-md-8 mt-5 py-2 shadow news-feed">
            <div className="row m-1">
              <h1>Members</h1>
              {members.map((member) => (
                <div className="col-md-4 mt-2 mb-2" key={member._id}>
                  <div className="p-3 text-light shadow bg-secondary" style={{ borderRadius: '4px' }}>
                    <h3>Name: {member.firstName} {member.lastName}</h3>
                    <p>Email: {member.email}</p>

                    <Link to={`/updateUser/${member._id}`}>
                      <button className="btn shadow btn-primary px-3 mr-1">
                        Update
                      </button>
                    </Link>

                    <button className="btn shadow btn-danger px-3 ml-1" onClick={() => handleDelete(member._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Members;
