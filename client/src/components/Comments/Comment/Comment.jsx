import React from 'react'
import { useState } from 'react'
import profileImage from '../../../img/defaultProfile.png'
import "./Coment.css"
import {EditOutlined , DeleteOutlined,SendOutlined}from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../../Actions/CommentAction';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useOnClickOutside } from '../../../hooks';
const Comment = ({comment,postId}) => {
  const dispatch =useDispatch()
  const ref =useRef()
  const textAreaRef=useRef()
  const [textDis, settextDis] = useState(true)
  const {user} =useSelector((state)=>state.authReducer.authData)
  const [formdata, setformdata] = useState({
    body:comment.body,
    currentUserId:user._id
  })
  const handleChange=(e)=>{
    setformdata({...formdata,body:e.target.value})
  }
  const handleDeleteComment=()=>{
    dispatch(deleteComment(user._id,comment._id))
  }

  useOnClickOutside(ref, () =>{
     settextDis(true)
     setformdata({...formdata,body:comment.body})
  });
  const handleEditComment=async ()=>{
    dispatch(editComment(formdata,comment._id))
    settextDis(true)
  }
  return (
    <div className='flex items-center gap-2 mt-2'>
        <div  className="userImage col-md-3">
            <img className='w-10 h-10 rounded-full object-cover' src={ comment.user.profilePicture} alt="" />
        </div>
        <div  className="col-md-9">
        <div className='flex items-center gap-2'>
          <span className='text-md font-semibold'>{comment.user.username}</span>
         
        
        </div>
        <div className='flex relative' ref={ref}>
            <textarea disabled={textDis}  ref={textAreaRef}  style={ {border:!textDis &&  "1px solid black"}}  value={formdata.body} onChange={handleChange}  cols={50}/>
            {
              comment.userId===user._id &&
              <>
              {
                textDis ?
                        <>
                          <EditOutlined className='absolute right-3 top-3 cursor-pointer text-sm' onClick={()=>{settextDis(false);textAreaRef.current.focus()}}/>
                          <DeleteOutlined onClick={handleDeleteComment} className='absolute right-8 text-red-500 top-3 cursor-pointer text-sm' />
                        </>:
                        <SendOutlined onClick={handleEditComment} className='absolute right-3 top-3 cursor-pointer text-sm z-10'/>

              }
                
                
              </>
            }
          </div>
        </div>
    </div>
  )
}

export default Comment