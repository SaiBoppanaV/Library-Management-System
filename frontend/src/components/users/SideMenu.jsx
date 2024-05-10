import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';

const SideMenu = () => {
  const{user} =useSelector(state=>state.user)
  return (
    <Fragment>
        {/* <div className="col-md-2 text-center shadow sub-profile" height={200}>
          <h4>{user.user.firstName ? `${user.user.firstName} ${user.user.lastName}` : user.user.orgName}</h4>
          <p className='text-secondary'>{user.user.bio ? `${user.user.bio}` : user.user.bio }</p>
          <p className='text-secondary'>{user.user.email ? `${user.user.email}` : user.user.orgEmail }</p>
          <Link to={`/profile/${user.user._id}`}><button style={{paddingRight: "35px", paddingLeft:"35px"}} className="btn btn-outline-primary">Profile</button></Link>
         <br /> 
         {user.user.role==="admin" && (

      <Link to={"/book/Createbook"}><button className="btn m-2 px-4 btn-danger">Create book</button>
</Link>
         )}
        </div> */}

<Sidebar className='mt-5 shadow' style={{backgroundColor: "#343434" ,
fontWeight:"bold"}}>
  <Menu  
  menuItemStyles={{
    button: {
      // the active class will be added automatically by react router
      // so we can use it to style the active menu item
      [`&.active`]: {
        backgroundColor: 'dark',
        color: '#b6c8d9',
      },
    },
  }}>
    <MenuItem component={<Link to="/home" />}>
    <i className="fa-solid fa-house m-2"></i> 
      Home </MenuItem>
    <MenuItem component={<Link to="/notifications" />}>
    <i className="fa-solid fa-bell m-2"></i>
     Notifications</MenuItem>
    <MenuItem component={<Link to="/borrow" />}> 
    <i className="fa-solid fa-book m-2"></i> Borrow Books</MenuItem>
    <MenuItem component={<Link to="/return" />}>
    <i className="fa-solid fa-rotate-left m-2"></i>Return Books</MenuItem>
    <MenuItem component={<Link to="/book/addBook" />}>
    <i className="fa-solid fa-square-plus m-2"></i>Add Books</MenuItem>
    {user.user.role === 'admin' && 
    <MenuItem component={<Link to="/updateBook" />}>
    <i className="fa-solid fa-pen-to-square m-2"></i>Update Books</MenuItem>
}

{user.user.role === 'admin' && 
    <MenuItem component={<Link to="/trackBook" />}>
    <i class="fa-solid fa-hourglass m-2"></i>Track Books</MenuItem> 
    }

{user.user.role === 'admin' && 
    <MenuItem component={<Link to="/addMember" />}>
    <i class="fa-solid fa-user-plus m-2"></i>Add Member</MenuItem> }

    {user.user.role === 'admin' && 
    <MenuItem component={<Link to="/members" />}>
    <i class="fa-solid fa-users m-2"></i>All Members</MenuItem> }
    <MenuItem component={<Link to="/logout" />}>
    <i class="fa-solid fa-right-from-bracket m-2"></i>Logout</MenuItem>
  </Menu>
</Sidebar>


    </Fragment>
  )
}

export default SideMenu