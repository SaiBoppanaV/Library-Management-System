import React from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const UserDetails = ({user}) => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
   const fetchUser =async  () => {
     try {
       const response = await axios.get(`/api/v2/profile/${user}`);
       setProfile(response.data);
       console.log(response)
       
       
     } catch (error) {
       alert.error(error.message)
     }
   };
 
   fetchUser();
 }, [user]);
 
  return (
    <div className='row m-1 '>
    <div
    className=' p-3 col-md-4 text-light shadow bg-secondary' style={{borderRadius:"4px"}}>
    <h5>Name: {profile.user.firstName} {profile.user.lastName}</h5>
    <h5>Email: {profile.user.email}</h5>
    <Link to={`/updateUser/${profile.user._id}`}>
    <button className='mt-1 btn btn-primary'>Update</button>
    </Link> 
    </div>
    </div>
  )
}

export default UserDetails