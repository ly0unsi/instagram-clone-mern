import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = ({profileUser,socket}) => {
  return (
    <div>
        <PostShare/>
        <Posts socket={socket} profileUser={profileUser}/>
    </div>
  )
}

export default PostSide