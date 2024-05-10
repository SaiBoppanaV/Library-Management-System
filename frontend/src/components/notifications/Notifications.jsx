import React, { Fragment, useEffect, useState } from 'react';
import SideMenu from '../users/SideMenu';
import NotificationsList from './NotificationsList';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Notifications = () => {
  const { user } = useSelector(state => state.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/v2/notifications');
        setNotifications(response.data.notifications);
        console.log(notifications)
        console.log("sfdf")
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideMenu />
          </div>
          <div className="col-md-8 mt-5 shadow news-feed">
            <h2 className="m-2">Notifications</h2>
            {notifications.length > 0 ? (
              notifications.reverse().map((notification, index) => (
                <NotificationsList key={index} notification={notification} />
              ))
            ) : (
              <p>No notifications found.</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Notifications;
