import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./users/user.css"

const Roles = () => {
  return (
    <Fragment>
        <div className='container center text-center'>
          

        <div className="row shadow center-content">
            {/* <div className="col-md-4"></div> */}
            <div className="col-md-6 " style={{fontSize:"300px"}}><i class="fa-solid fa-book-open-reader" ></i></div>
            <div className="col-md-6 p-5 bg-light  ">
            <h1>Smart Library</h1>
            <div className="p-5 ">
               
                <Link to={"/login/member"}>
                    <button className=" btn  shadow role-btn ">Member</button>
                </Link>
        

            <div className="p-5">
            <Link to={"/login/organization"}>
                    <button className="btn shadow role-btn ">Admin</button>
                </Link>
                
            {/* <div className="col-md-4"></div> */}
        </div>
        </div>
</div>
</div>
        </div>
    </Fragment>
  )
}

export default Roles