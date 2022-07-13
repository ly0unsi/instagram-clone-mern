import React from 'react'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import './Posts.css'
const Posts = () => {
  return (
    <div className='Posts'>
        {PostsData.map((post,key)=>{
            return(
                <Post post={post} id={key}/>
            )
        } )}
    </div>
  )
}

export default Posts