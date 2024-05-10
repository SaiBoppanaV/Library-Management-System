import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import SideMenu from '../users/SideMenu';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
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

    fetchBooks();
  }, []);

  return (
    <Fragment>
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideMenu />
          </div>
          <div className="col-md-8 mt-5 py-2 shadow news-feed">
            <div className="row">
              <h1>Borrow Books</h1>
              {books.map((book) => (
                <div className="col-md-4 mt-2 mb-2" key={book._id}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BooksList;
