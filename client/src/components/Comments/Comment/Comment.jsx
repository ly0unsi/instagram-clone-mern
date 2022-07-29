import React from 'react'
import { useState } from 'react'
import profileImage from '../../../img/defaultProfile.png'
import "./Coment.css"
import {EditOutlined}from '@ant-design/icons';
import { useSelector } from 'react-redux';
const Comment = ({comment}) => {
  const [textDis, settextDis] = useState(true)
  const {user} =useSelector((state)=>state.authReducer.authData)
  return (
    <div className='flex items-center gap-2 mt-2'>
        <div  className="userImage col-md-3">
            <img className='w-10 rounded-full object-cover' src={ process.env.REACT_APP_STORAGE_URL + comment.user?.profilePicture} alt="" />
        </div>
        <div  className="col-md-9">
        <div className='flex items-center gap-2'>
          <span className='text-md font-semibold'>{comment.user.username}</span>
         
        
        </div>
        <div className='flex relative'>
            <textarea disabled={textDis} style={ {border:!textDis &&  "1px solid black"}}  value={comment.body}  cols={50}/>
            {
              comment.userId===user._id &&
              <EditOutlined className='absolute right-3 top-3 cursor-pointer text-sm' onClick={()=>settextDis(false)}/>
            }
          </div>
        </div>
    </div>
  )
}

export default Comment