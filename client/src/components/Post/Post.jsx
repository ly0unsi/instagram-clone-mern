import React from 'react'
import Profile from '../../img/defaultProfile.png'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { likePost } from '../../Actions/PostAction'
import { useEffect } from 'react'
const Post = ({post,page}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const [liked, setliked] = useState(post.likes.includes(user._id))
  const [likes, setlikes] = useState(post.likes.length)
  const dispatch =useDispatch()
  const like=(id)=>{
    setliked((prev)=>!prev)
    liked ? setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
    dispatch (likePost(id,user._id))
  }
  useEffect(() => {
    setliked(post.likes.includes(user._id))
    setlikes(post.likes.length)
  }, [post])
  
  return (
    <div className='Post'>
      {page==="homePage" && 
        <div className='flex items-center'> 
        <img className='w-7 mr-2' src={post.user?.profilePicture ? process.env.REACT_APP_STORAGE_URL + post.user.profilePicture: Profile} alt="" />
        <span className='font-medium text-sm'>
        {post.user?.firstname} {post.user?.lastname}
        </span> 
      </div>
      }
        <img src={post.image && process.env.REACT_APP_STORAGE_URL+ post.image} alt="" />
            <div className="postReact w-60">
                <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} onClick={()=>like(post._id)}/>
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
                <span className='float-right'>{moment(post.createdAt).startOf('hour').fromNow()}</span>
            </div>
            <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>
            
            <div className="detail">
                <span><b>{post.name}</b></span>
                <span> {post.desc}</span>
            </div>
     
    </div>
  )
}

export default Post