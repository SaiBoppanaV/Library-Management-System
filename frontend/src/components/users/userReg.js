import React,{Fragment, useState,useEffect} from 'react'
// import "./user.css"
import Loader from "../Layout/Loader/Loader"
import { Link } from 'react-router-dom'
import { MdOutlineLockOpen } from 'react-icons/md'
import { MdMailOutline } from 'react-icons/md'
import { MdLockOpen } from 'react-icons/md'
import { MdFace } from 'react-icons/md'
import { register,clearErrors } from '../../Actions/userAction'
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom"


const UserReg = ({history}) => {

  const navigate = useNavigate(); 
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,isAuthenticated}=useSelector(state=>state.user)
  const [user,setUser]=useState({
        firstName:"",
        lastName:"",
    email: '',
    password: '',
    confirmPassword: '',
    });
    const {firstName,lastName,
      email,
      password,
      confirmPassword}=user
  
    const registerSubmit=(e)=>{
      e.preventDefault();
  

        const myForm={
          firstName: firstName,
        lastName: lastName,
       
        email:email,
       
      
        password:password,
    
        }
        
    
        dispatch(register(myForm));
    }

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(isAuthenticated){
      navigate("/home")
      }
    }, [alert,isAuthenticated,dispatch,error,navigate])
    

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
         
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });  
        }
    }
    return (
    <Fragment>
        {/* <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox"> */}
        <div className="col-xxl-8 m-5 mb-xxl-0">
      <div className="container bg-light shadow bg-secondary-soft emp-profile px-4 py-5 rounded">
            {/* <h2>Register Now</h2> */}
         
            <h4 className="mb-4 mt-0">Sign Up!</h4>
            <form
              
              
                onSubmit={registerSubmit}
              >
                   <div className="row g-3">
                 <hr />
            {/* First Name */}
            <div className="col-md-6">
              <label className="form-label">First Name </label>
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
                  required
                  name="firstName"
                  value={firstName}
                  onChange={registerDataChange}
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
                  required
                  name="lastName"
                  value={lastName}
                  onChange={registerDataChange}
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
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
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
          

                <input type="submit" value="Register" className="btn btn-danger" />
                <div className="col-md-12 text-center">Already have an account? <Link to={"/login/member"}><button className='btn btn-outline-primary'>Log in</button></Link></div>

                </div>
              </form>
          

        </div>
    </div>
    </Fragment>
  )
}

export default UserReg;