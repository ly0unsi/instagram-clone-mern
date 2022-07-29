import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SendOutlined}from '@ant-design/icons';
import Comment from './Comment/Comment'

const Comments = ({comments,postId}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const dispatch=useDispatch()

 
  const [formData, setformData] = useState({
    body:"",
    postId:postId,
    userId:user.id
  })
  const HandleComment=()=>{
    dispatch(addComment(formData))
  }
  const handleChange =(e)=>{
    e.preventDefault()
    setformData({...formData,body:e.target.value})
  }

  return (
    <div className='ml-5'>
          {
            comments.filter((comment)=>comment.postId===postId) && 
                <span className='text-md font-semibold '>Comments</span>
          }
          <div className='h-[193px] overflow-y-scroll'>
              {
                comments.filter((comment)=>comment.postId===postId).map((comment,key)=>{
                  return(
                    <div key={key}> 
                      <Comment comment={comment}/>
                    </div>
                    
                  )
                
                })
                
              }
          </div>
        
     
          <div className='flex relative'>
          <SendOutlined onClick={HandleComment} className='absolute right-3 top-2 cursor-pointer text-lg'/>
        
          <textarea onChange={handleChange} className='leaveComment' placeholder="Leave a comment" cols="30" rows="10"></textarea>
        </div>
      
    </div>
  )
}

export default Comments