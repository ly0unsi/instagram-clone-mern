import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = ({page}) => {
  return (
    <div>
        <PostShare/>
        <Posts page={page}/>
    </div>
  )
}

export default PostSide