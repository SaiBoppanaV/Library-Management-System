import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';
import '../home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../users/SideMenu';
import BookCard from './BookCard';

const Book = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`/api/v2/book/${id}`);
        const data = response.data;
        setBook(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Fragment>
      {book ? (
        <Fragment>
      
          <div className="container-fluid">
            <div className="row">
            <div className="col-md-3"><SideMenu/></div>
              <div className="col-md-8 mt-5 py-2 shadow news-feed">
              <div className='row m-1 '>
                  <BookCard book={book}/>

                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Book;
