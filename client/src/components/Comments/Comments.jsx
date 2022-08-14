import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SendOutlined}from '@ant-design/icons';
import Comment from './Comment/Comment'
import { useState } from 'react';
import { addComment } from '../../Actions/CommentAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Comments = ({comments,postId,setcommentsNumber}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const dispatch=useDispatch()
  const [formData, setformData] = useState({
    body:"",
    postId:postId,
    userId:user._id
  })
  const HandleComment=()=>{
    resetForm()
    setcommentsNumber((prev)=>prev+=1)
    dispatch(addComment(formData))
  }
  const resetForm =()=>{
    setformData({...formData,body:""})
  }
  const handleChange =(e)=>{
    setformData({...formData,body:e.target.value})
  }

  return (
    <div className='ml-5'>
          {
            comments.filter((comment)=>comment.postId===postId) && 
                <span className='text-md font-semibold '>Comments</span>
          }
          <div className='h-[193px] overflow-y-scroll'>
          <TransitionGroup component="ul">
              {
                comments.filter((comment)=>comment.postId===postId).map((comment,key)=>{
                  return(
                    <CSSTransition key={key} timeout={700} classNames="alert">
                        <div key={key}> 
                          <Comment comment={comment} setcommentsNumber={setcommentsNumber} postId={postId}/>
                        </div>
                    </CSSTransition>
                  )
                
                })
                
              }
              </TransitionGroup>
          </div>
        
     
          <div className='flex relative'>
          <SendOutlined onClick={HandleComment} className='absolute right-3 top-2 cursor-pointer text-lg z-10'/>
          <textarea onChange={handleChange} value={formData.body} className='leaveComment' placeholder="Leave a comment" cols="30" rows="10"></textarea>
        </div>
      
    </div>
  )
}

export default Comments