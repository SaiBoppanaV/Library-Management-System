import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';
import SideMenu from '../users/SideMenu';

const BorrowBook = () => {
  const { id } = useParams();
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const alert = useAlert();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`/api/v2/book/${id}`);
        const data = response.data;
        setBook(data);
      } catch (error) {
        alert.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id, alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v2/borrow', {
        id,
        borrowDate,
        returnDate,
      });

      if (response.status === 201) {
        alert.success('Book Borrowed Successfully');
        navigate('/return');
      } else {
        throw new Error(response.data.message);
      }
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
            <div className="row">
              <div className="col-md-4">
                {loading ? (
                  <p>Loading book details...</p>
                ) : (
                  <div className="p-3 text-light shadow bg-secondary" style={{ borderRadius: '4px' }}>
                    <h3>Title: {book.title}</h3>
                    <p>Description: {book.description}</p>
                    <p>Category: {book.category}</p>
                    <p>Author: {book.author}</p>
                    <p>Status: {book.status}</p>
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                  <br />

                  <label htmlFor="borrowDate">Borrow Date:</label>
                  <input
                    type="date"
                    id="borrowDate"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                  />
                  <br />

                  <label htmlFor="returnDate">Return Date:</label>
                  <input
                    type="date"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <br />

                  <button type="submit" className='btn shadow btn-danger px-5'>Borrow</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BorrowBook;
