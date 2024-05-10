import { FETCH_BOOK_FAILURE, 
    FETCH_BOOK_SUCCESS, 
    FETCH_BOOK_REQUEST,
FETCH_book_FAILURE,
FETCH_book_REQUEST,
FETCH_book_SUCCESS,
CELAR_ERRORS } from "../Constants/bookConstants";
import axios from "axios";

//FETCH bookS
export const fetchbooks=()=>async  (dispatch) =>{
    try {
        dispatch({
            type:FETCH_BOOK_REQUEST
        })
        
   
        const {data}=await axios.get('/api/v2/books')
        
        dispatch({type:FETCH_BOOK_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: FETCH_BOOK_FAILURE,
                   payload:error.response.data.message});
    }
  }

  //FETCH book Details
export const bookDetail=(id)=>async  (dispatch) =>{
    console.log("hello")
    try {
        dispatch({
            type:FETCH_book_REQUEST
        })
        
   
        const {data}=await axios.get(`/api/v2/book/${id}`)
        
        dispatch({type:FETCH_book_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: FETCH_book_FAILURE,
                   payload:error.response.data.message});
    }
  }

    //clearing erros
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CELAR_ERRORS
    })
    }