import React from 'react';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import SideMenu from '../users/SideMenu';
import moment from 'moment';
import './/Track.css';
import axios from 'axios';
import { useAlert } from 'react-alert';

const TrackBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    // Fetch the list of borrowed books from the backend API
    const fetchBorrowedBooks = async () => {
      try {
        const response = await fetch('/api/v2/borrowedBooks');
        const data = await response.json();
        setBorrowedBooks(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YY');
  };

  const HandleAlert = async (id, title) => {
    try {
      const response = await axios.post('/api/v2/sendAlert', { id, title });

      alert.success(response.data.message);
    } catch (error) {
      alert.error(error.message);
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
            <div>
              <h2>Borrowed Books</h2>
              {borrowedBooks.length === 0 ? (
                <p>No books currently borrowed.</p>
              ) : (
                <table className="borrowed-books-table">
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Borrowed Date</th>
                      <th>Return Date</th>
                      <th>Member</th>
                      <th>Overdue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedBooks.map((borrowedBook) => (
                      <tr key={borrowedBook._id}>
                        <td>{borrowedBook.book ? borrowedBook.book.title : 'N/A'}</td>
                        <td>{formatDate(borrowedBook.borrowDate)}</td>
                        <td>{formatDate(borrowedBook.returnDate)}</td>
                        <td>
                          {borrowedBook.member
                            ? `${borrowedBook.member.firstName} ${borrowedBook.member.lastName}`
                            : 'N/A'}
                        </td>
                        <td>{borrowedBook.overdue ? 'Yes' : 'No'}</td>
                        {borrowedBook.overdue && (
                          <td>
                            {' '}
                            <button
                              className="btn btn-danger"
                              onClick={() => HandleAlert(borrowedBook.member._id, borrowedBook.book.title)}
                            >
                              Send Alert
                            </button>{' '}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrackBook;
