import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createbook } from '../../Actions/bookAction';
import { useEffect } from 'react';
import axios from 'axios';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import SideMenu from '../users/SideMenu';
import { useAlert } from 'react-alert';

const Createbook = () => {
  const navigate = useNavigate();
  const alert=useAlert();
  const {isAuthenticated,user}=useSelector(state=>state.user)

  const [book, setbook] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
  });

  const { title, description, category, author} = book;

  const createbookSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v2/createbook', book);
      
      console.log(response.data)
      if (response.status === 201) {
        // book created successfully
        // Dispatch an action or perform any necessary logic
        alert.success("New Book Added!")
        navigate(`/books/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error creating book:', error.message);
      alert.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    setbook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
       
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-3"><SideMenu/></div>
        <div className="col-md-8 mt-5 shadow news-feed">
        <h2>Create book</h2>
        <form onSubmit={createbookSubmit}>
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
                  <i class="fa-solid fa-briefcase"></i>                  </span>
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
                  <i class="fa-solid fa-user-tie"></i>                </span>
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
          Add Book
          </button>
        </form>
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Createbook;