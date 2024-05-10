import { LOGIN_FAIL,
    LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CELAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
ORG_LOGIN_FAIL,
ORG_LOGIN_REQUEST,
ORG_LOGIN_SUCCESS,
ORG_REGISTER_FAIL,
ORG_REGISTER_REQUEST,
ORG_REGISTER_SUCCESS,
FETCH_PROFILE_REQUEST,
FETCH_PROFILE_SUCCESS,
FETCH_PROFILE_FAILURE,
 } from "../Constants/userConstants"

  import axios from "axios"

  //Login 
  export const login=(formData)=>async  (dispatch) =>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        })
        
   
        const {data}=await axios.post('/api/v2/login/member',formData,{ withCredentials: true })
        
        dispatch({type:LOGIN_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: LOGIN_FAIL,
                   payload:error.response.data.message});
    }
  }
  export const orgLogin=(formData)=>async  (dispatch) =>{
    try {
        dispatch({
            type:ORG_LOGIN_REQUEST
        })
        
   
        const {data}=await axios.post('/api/v2/login/Admin',formData,{ withCredentials: true })
        
        dispatch({type:ORG_LOGIN_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: ORG_LOGIN_FAIL,
                   payload:error.response.data.message});
    }
  }

   //Admin Register
   export const orgRegister = (userData) => async (dispatch) => {
    try {
      dispatch({ type: ORG_REGISTER_REQUEST });
  
      const config ={headers:{"Content-Type":"multipart/form-data"}}

    
        

      const { data } = await axios.post('/api/v2/register/Admin',userData,config);
  
      dispatch({
        type: ORG_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORG_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  

  //Register
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
  
      

      console.log(userData)
        

      const { data } = await axios.post('/api/v2/register/member',userData);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//Load user
  export const loadUser=()=>async  (dispatch) =>{
    try {
        dispatch({
            type:LOAD_USER_REQUEST
        })
        
        const config ={headers:{"Content-Type":"application/json"}}

        
        const {data}=await axios.get('/api/v1/me')
        
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user})
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL,
                   payload:error.response.data.message});
    }
  }

//Logout
export const logout=()=>async  (dispatch) =>{
  try {
      
      await axios.get('/api/v2/logout')
      
      dispatch({type:LOGOUT_SUCCESS})
  } catch (error) {
      dispatch({type: LOGOUT_FAIL,
                 payload:error.response.data.message});
  }
}

//profile

export const fetchProfile = (id) => async (dispatch) => {
 

    try {
      dispatch({ type: FETCH_PROFILE_REQUEST });
      console.log("dsda")
      const response = await axios.get(`/api/v2/profile/${id}`);
      console.log(response)
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
    }
  };


  //clearing erros
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CELAR_ERRORS
    })
    }


