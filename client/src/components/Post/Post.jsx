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
import FollowButton from '../FollowButon/FollowButton'
import { useLocation } from 'react-router-dom'
import { getUser } from '../../Api/UserApi'
const Post = ({post}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const [liked, setliked] = useState(post.likes.includes(user._id))
  const [likes, setlikes] = useState(post.likes.length)
  const [postOwner, setpostOwner] = useState(null)
  const location =useLocation()
  const dispatch =useDispatch()
  
  const like=(id)=>{
    setliked((prev)=>!prev)
    liked ? setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
    dispatch (likePost(id,user._id))
  }
  const setLikekedEffect=()=>{
    setliked(post.likes.includes(user._id))
    setlikes(post.likes.length)
  }
  const getPostOwnerEffect=async()=>{
    const {data}=await getUser(post.userId)
    setpostOwner(data)
  }
  useEffect(() => {
    return()=>{
      setLikekedEffect()
    }
  }, [post])
  useEffect(() => {
    getPostOwnerEffect()
  }, [postOwner])
  

  return (
    <div className='Post'>
      {  postOwner && location.pathname=="/home" && 
        <div className='flex items-center'> 
        <img className='w-9 h-9 mr-2 object-cover rounded-full' src={postOwner?.profilePicture ? process.env.REACT_APP_STORAGE_URL + postOwner?.profilePicture: Profile} alt="" />
        <span className='font-medium text-sm'>
         {postOwner?.username}
        </span> 
        {
        
          postOwner?._id !== user._id &&
          <div className='float-right ml-4'>
            <FollowButton profile={postOwner} />
          </div>
        }
       
        
      </div>
      }
        <img src={post.image && process.env.REACT_APP_STORAGE_URL+ post.image} alt="" className='object-cover'  />
            <div className="postReact items-center">
                <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} onClick={()=>like(post._id)}/>
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
                <span className='float-right text-xs'>{moment(post.createdAt).startOf('hour').fromNow()}</span>
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