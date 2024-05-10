import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import UserReg from './components/users/userReg';
import React from "react";
import WebFont from 'webfontloader';
import { useSelector } from 'react-redux';
import Home from "./components/Home"
import UserLogin from './components/users/userLogin';
import Book from './components/books/Book';
import Logout from "./components/users/Logout";
import RegForm from './components/users/Reg';
import Roles from './components/Roles';
import OrganizationLogin from './components/users/orgLogin';
import OrgReg from './components/users/orgReg';
import Createbook from './components/books/Createbook';
import Notifications from './components/notifications/Notifications';
import UpdateUser from './components/users/UpdateUser';
import BooksList from './components/books/BooksList';
import BorrowBook from './components/books/BorrowBook';
import ReturnBook from './components/books/ReturnBook';
import UpdateBook from './components/books/UpdateBook';
import UpdateForm from './components/books/UpdateForm';
import TrackBook from './components/books/TrackBook';
import AddMember from './components/users/AddMember';
import Members from './components/users/Members';

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanks"]
      }
    })
    
  },[])

  const {isAuthenticated,user}=useSelector(state=>state.user)
  
  return (
    <Router>
     
      <Routes>
      <Route path="/" element={<Roles />}/>
      <Route path="/login/member" element={<UserLogin/>} />
      <Route path="/login/organization" element={<OrganizationLogin/>} />
      <Route path="/register/member" element={<UserReg/>}/>
      <Route path="/register/organization" element={<OrgReg/>}/>
      {isAuthenticated && <Route path="/home" element={<Home />} />}
       <Route path='/notifications' element={<Notifications/>} />
      <Route exact path="/books/:id" element={<Book />}  />
      <Route path="/logout" element={<Logout />} />
       <Route exact path="/book/addBook" element={<Createbook/>}/>
      <Route exact path="/updateUser/:id" element={<UpdateUser/>} />
      <Route path="/borrow" element={<BooksList/>} />
      <Route path="/return" element={<ReturnBook/>} />
      <Route path="/updateBook" element={<UpdateBook/>} />
      <Route exact path="/borrow/:id" element={<BorrowBook/>} />
      <Route exact path="/updateBook/:id" element={<UpdateForm/>} />
      <Route  path="/trackBook" element={<TrackBook/>} />
      <Route path='/addMember' element={<AddMember/>} />
      <Route path='/members' element={<Members/>} />
      </Routes>
    </Router>
      );
}

export default App;
