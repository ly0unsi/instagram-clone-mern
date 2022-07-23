import React from 'react'
import { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getTimelinePosts } from '../../Actions/PostAction'
import Post from '../Post/Post'
import './Posts.css'
import PulseLoader from "react-spinners/ClipLoader";
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
const Posts = () => {
  const dispatch =useDispatch()
  const {followers}=useSelector((state)=>state.userReducer)
  const {user} =useSelector((state)=>state.authReducer.authData)
  const {posts,loading} =useSelector((state)=>state.postReducer)
  const location =useLocation()
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "orange",
  };
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [dispatch,followers])
  
  return (

    <div className='Posts columns-3'>
      {
        loading ? <PulseLoader cssOverride={override}/>: location.pathname!=="/home" ?
        posts.filter((post)=>post.userId===user._id).map((post,id)=>{
          return(
            <div key={id}>
               <Post post={post} />
            </div>
             
          )
      } )
      :
      posts.map((post,id)=>{
        return(
          <div key={id}>
             <Post post={post}/>
          </div>
           
        )
      } )
      }
        
    </div>
  )
}

export default Posts