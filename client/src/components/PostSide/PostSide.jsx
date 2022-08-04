import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = ({profileUser}) => {
  return (
    <div>
        <PostShare/>
        <Posts profileUser={profileUser}/>
    </div>
  )
}

export default PostSide