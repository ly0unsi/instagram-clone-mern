import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { likePost } from '../../Actions/PostAction'
const Post = ({post}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const [liked, setliked] = useState(post.likes.includes(user._id))
  const [likes, setlikes] = useState(post.likes.length)
  const dispatch =useDispatch()
  const like=(id)=>{
    setliked((prev)=>!prev)
    liked ? setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
    dispatch (likePost(id,user._id))
  }
  return (
    <div className='Post'>
        <img src={process.env.REACT_APP_STORAGE_URL+ post.image} alt="" />
            <div className="postReact">
                <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} onClick={()=>like(post._id)}/>
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
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