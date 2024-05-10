import {createStore, combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { userReducer } from "./Reducers/userReducer";
import bookReducer, { bookDetailsReducer } from "./Reducers/bookReducer";
const reducer=combineReducers({
     user:userReducer,
     book:bookReducer,
     bookDetails:bookDetailsReducer,
  
});



const middleWare=[thunk]

const store= createStore(reducer,composeWithDevTools(applyMiddleware(...middleWare)));

export default store