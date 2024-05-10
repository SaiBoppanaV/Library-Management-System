import React,{Fragment, useState,useEffect} from 'react'
import "./user.css"
import Loader from "../Layout/Loader/Loader"
import { Link } from 'react-router-dom'
import { MdOutlineLockOpen } from 'react-icons/md'
import { MdMailOutline } from 'react-icons/md'
import { MdLockOpen } from 'react-icons/md'
import { MdFace } from 'react-icons/md'
import { login,clearErrors } from '../../Actions/userAction'
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom"


const UserLogin = ({history}) => {

  const navigate = useNavigate(); 
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,isAuthenticated}=useSelector(state=>state.user)
  const [user,setUser]=useState({
        email:"",
        password:""
    });
    const {email,password}=user

    // const [avatar,setAvatar]=useState("/Profile.png");
  
    // const[avatarPreview,setAvatarPreview]=useState("/Profile.png");
  
    const registerSubmit=(e)=>{
      e.preventDefault();
        // const myForm = new FormData();
        // myForm.append("firstName",firstName)
       
        // myForm.append("lastName",lastName)
        
        // myForm.append("email",email)
        
        // myForm.append("password",password)

        const myForm={
          email: email,
          password: password
        }
        
        // myForm.set("avatar",avatar)
        dispatch(login(myForm));
    }

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(isAuthenticated){
      navigate("/home")
      }
    }, [alert,isAuthenticated,dispatch,error])
    

    const registerDataChange = (e) => {
        // if (e.target.name === "avatar") {
        //   const reader = new FileReader();
    
        //   reader.onload = () => {
        //     if (reader.readyState === 2) {
        //       setAvatarPreview(reader.result);
        //       setAvatar(reader.result);
        //     }
        //   }
        //   reader.readAsDataURL(e.target.files[0]);
        // } else {
          setUser({ ...user, [e.target.name]: e.target.value });  
        // }
    }
    return (
    <Fragment>
  
        <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
            <h2>Login Now</h2>
            <form
                className="signUpForm"
                onSubmit={registerSubmit}
              >
                
                <div className="signUpEmail">
                  <MdMailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                  />
                </div>

                <input type="submit" value="Login" className="signUpBtn" />
                <Link to={"/forgotPassword"} style={{fontSize: "small"}}>Forgot Password</Link>
                <p>Dont have an account?</p> <Link to={"/register/member"}><button className='btn btn-outline-danger '>Register</button></Link>
              </form>

        </div>
    </div>
    </Fragment>
  )
}

export default UserLogin;