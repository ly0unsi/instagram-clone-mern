import React from 'react'
import { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getTimelinePosts } from '../../Actions/PostAction'
import Post from '../Post/Post'
import './Posts.css'
import PulseLoader from "react-spinners/ClipLoader";
const Posts = () => {
  const dispatch =useDispatch()
  const {user} =useSelector((state)=>state.authReducer.authData)
  const {posts,loading} =useSelector((state)=>state.postReducer)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "orange",
  };
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [dispatch])
  
  return (

    <div className='Posts'>
      {
        loading ? <PulseLoader cssOverride={override}/>:
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