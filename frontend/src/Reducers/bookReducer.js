import { FETCH_BOOK_FAILURE,
     FETCH_BOOK_SUCCESS, 
     FETCH_BOOK_REQUEST,
    FETCH_book_FAILURE,
  FETCH_book_REQUEST,
FETCH_book_SUCCESS } from "../Constants/bookConstants";

  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOK_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_BOOK_SUCCESS:
        return {
          ...state,
          loading: false,
          books: action.payload.data,
          error: null
        };
      case FETCH_BOOK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
       
      
      default:
        return state;
    }
  };

  export const bookDetailsReducer=(state = { book:{} }  ,action)=>{
    switch(action.type){
      case FETCH_book_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          selectedbook: null
        };
      case FETCH_book_SUCCESS:
        return {
          ...state,
          loading: false,
          selectedbook: action.payload.data,
          error: null
        };
      case FETCH_book_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
       default:return state
            }

}
  
  export default bookReducer;