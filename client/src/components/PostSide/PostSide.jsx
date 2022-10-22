import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = ({ profileUser, socket }) => {
  return (
    <div className='col-sm-12 col-lg-6 lg:px-4 overflow-y-scroll  h-[150vh]'>
      <PostShare />
      <Posts socket={socket} profileUser={profileUser} />
    </div>
  )
}

export default PostSide