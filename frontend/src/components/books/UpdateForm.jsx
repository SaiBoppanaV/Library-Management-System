import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createbook } from '../../Actions/bookAction';
import { useNavigate, useParams } from 'react-router-dom';
import SideMenu from '../users/SideMenu';
import { useAlert } from 'react-alert';
import axios from 'axios';

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [book, setBook] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
  });

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`/api/v2/book/${id}`);
        const data = response.data;
        setBook(data);
      } catch (error) {
        alert.error(error.message);
      }
    };

    fetchBookDetail();
  }, [id, alert]);

  const { title, description, category, author } = book;

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v2/updatebook/${id}`, book);
      if (response.status === 200) {
        alert.success('Book updated successfully');
        navigate(`/books/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
     
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideMenu />
          </div>
          <div className="col-md-8 mt-5 shadow news-feed">
            <h2>Update book</h2>
            <form onSubmit={updateBook}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <div className="input-group shadow">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend1">
                      <i className="fa-solid fa-pen" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <div className="input-group shadow">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend2">
                      <i className="fa-solid fa-briefcase"></i>
                    </span>
                  </div>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <div className="input-group shadow">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend4">
                      <i className="fa-solid fa-list" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Author</label>
                <div className="input-group shadow">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend6">
                    <i class="fa-solid fa-user-tie"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    name="author"
                    value={author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn shadow px-5 mt-2 mb-3 btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateForm;
