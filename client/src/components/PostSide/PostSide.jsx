import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = () => {
  return (
    <div>
        <PostShare/>
        <Posts/>
    </div>
  )
}

export default PostSide