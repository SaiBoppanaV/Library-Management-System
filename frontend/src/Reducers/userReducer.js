import { LOGIN_FAIL,
    LOGIN_SUCCESS,
  LOGIN_REQUEST,CELAR_ERRORS,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  ORG_LOGIN_FAIL,
  ORG_LOGIN_REQUEST,
  ORG_LOGIN_SUCCESS ,
ORG_REGISTER_FAIL,
ORG_REGISTER_REQUEST,
ORG_REGISTER_SUCCESS ,
FETCH_PROFILE_REQUEST,
FETCH_PROFILE_SUCCESS,
FETCH_PROFILE_FAILURE,} from "../Constants/userConstants"

  const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
  };
  

export const userReducer=(state = initialState  ,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case ORG_LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case ORG_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        
            return{
                ...state,
                loading:true
            }
        case LOGIN_SUCCESS:
        case ORG_LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case ORG_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading: false,
            isAuthenticated: true,
            user:action.payload
            };
        case LOGIN_FAIL:
        case ORG_LOGIN_FAIL:
        case ORG_REGISTER_FAIL:
        case REGISTER_FAIL:
                return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
            case CELAR_ERRORS:
                return {
                     ...state,
                    error:null,
                }
            case LOAD_USER_FAIL:
                return{
                    loading:false,
                    isAuthenticated:false,
                    user:null,
                    error:action.payload
                }
            case LOGOUT_SUCCESS:
                return{
                    loading:false,
                    user:null,
                    isAuthenticated:false
                }
            case LOGOUT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }

                case FETCH_PROFILE_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case FETCH_PROFILE_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      profile: action.payload,
                      error: null,
                    };
                  case FETCH_PROFILE_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      profile: null,
                      error: action.payload,
                    };
            default:
                return state;
    }
}