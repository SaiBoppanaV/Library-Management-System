import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

const NotificationsList = ({notification}) => {

  return (
   <Fragment>
  
        <div className='mt-3 mb-3 p-5 shadow ' style={{background: "#DCDCDC", borderRadius:"6px"}}>
         <h3>{notification}</h3>
         {console.log(notification)}
        </div>

   </Fragment>
  )
}

export default NotificationsList