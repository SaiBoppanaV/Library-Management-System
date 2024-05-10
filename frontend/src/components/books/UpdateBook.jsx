import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import SideMenu from '../users/SideMenu';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { fetchbooks } from '../../Actions/bookAction';
import { Link } from 'react-router-dom';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const { user } = useSelector(state => state.user);
  const alert = useAlert();

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/v2/books');
      const data = response.data;
      setBooks(data.books);
      console.log(books)
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookID) => {
    try {
     
      const response = await axios.delete(`/api/v2/deletebook/${bookID}`,);
      if (response.status==201) {
        alert.success('Book Deleted successfully!');
        fetchBooks();
      } else {
        const error = await response.json();
        alert.error(error.message);
      }
    } catch (error) {
      alert.error('An error occurred while Deleting the book.');
      console.error(error);
    }
  };

  

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideMenu />
          </div>
          <div className="col-md-8 mt-5 py-2 shadow news-feed">
            <div className="row m-1">
              <h1>Update Books</h1>
              {books.map(book => (
                <div className="col-md-4 mt-2 mb-2" key={book._id}>
                  <div className="p-3 text-light shadow bg-secondary" style={{ borderRadius: "4px" }}>
                    <h3>Title: {book.title}</h3>
                    <p>Description: {book.description}</p>
                    <p>Category: {book.category}</p>
                    <p>Author: {book.author}</p>
                    <p>Status: {book.status}</p>
                    <Link to={`/updateBook/${book._id}`}>
                    <button className="btn shadow btn-primary px-3 mr-1" >
                     Update
                    </button></Link>
                    
                    <button className="btn shadow btn-danger px-3 ml-1" onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBook;
