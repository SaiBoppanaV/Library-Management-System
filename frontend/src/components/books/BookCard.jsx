import React from 'react'
import { Link } from 'react-router-dom'
const BookCard = ({book}) => {

  return (
    <div
    className=' p-3 text-light shadow bg-secondary' style={{borderRadius:"4px"}}>
                <h3>Title: {book.title}</h3>
                <p>Description: {book.description}</p>
                <p>Category: {book.category}</p>
                <p>Author: {book.author}</p>
                <p>Status: {book.status}</p>
                {/* Display other book details */}
                {book.status === 'Available' && (
                    <Link to={`/borrow/${book._id}`} >
                  <button className="btn btn-danger px-5" >
                    Borrow
                  </button>
                  </Link>
                )}
               
                </div>
  )
}

export default BookCard