import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import SideMenu from '../users/SideMenu';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const ReturnBook = () => {
  const [books, setBooks] = useState([]);
  const { user } = useSelector(state => state.user);
  const alert = useAlert();

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/api/v2/memberBooks/${user.user._id}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert.error(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user.user._id]);

  const handleReturn = async (bookID) => {
    try {
       
      const response = await axios.post('/api/v2/return', { bookID });
      if (response.status==201) {
        alert.success('Book returned successfully!');
        fetchBooks();
      } else {
        const error = await response.json();
        alert.error(error.message);
      }
    } catch (error) {
      alert.error('An error occurred while returning the book.');
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
              <h1>Return Books</h1>
              {books.map(book => (
                <div className="col-md-4 mt-2 mb-2" key={book._id}>
                  <div className="p-3 text-light shadow bg-secondary" style={{ borderRadius: "4px" }}>
                    <h3>Title: {book.title}</h3>
                    <p>Description: {book.description}</p>
                    <p>Category: {book.category}</p>
                    <p>Author: {book.author}</p>
                    <p>Status: {book.status}</p>
                    <button className="btn shadow btn-danger px-5" onClick={() => handleReturn(book._id)}>
                      Return
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

export default ReturnBook;
