import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostComments } from '../../Actions/PostAction'
import {SendOutlined}from '@ant-design/icons';
import Comment from './Comment/Comment'

const Comments = ({comments,postId}) => {
  const {loading} =useSelector((state)=>state.postReducer)


    
  return (
    <div className='ml-5'>
          {
            comments.filter((comment)=>comment.postId===postId) >0 && 
                <span className='text-md font-semibold '>Comments</span>
          }
         {
            comments.filter((comment)=>comment.postId===postId).map((comment,key)=>{
              return(
                <div key={key}> 
                  <Comment comment={comment}/>
                </div>
                
              )
            
            })
            
          }
     
        <span className='text-sm font-semibold '>Leave a comment</span>
        <div className='flex relative'>
        <SendOutlined className='absolute right-3 top-2 cursor-pointer text-lg'/>
       
        <textarea className='leaveComment' cols="30" rows="10"></textarea>
        </div>
      
    </div>
  )
}

export default Comments