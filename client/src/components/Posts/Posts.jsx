import React from 'react'
import { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getTimelinePosts } from '../../Actions/PostAction'
import { LoadingOutlined } from '@ant-design/icons';
import Post from '../Post/Post'
import './Posts.css'
import { useLocation } from 'react-router-dom'
const Posts = () => {
  const dispatch =useDispatch()
  const {user} =useSelector((state)=>state.authReducer.authData)

  const {posts,loading} =useSelector((state)=>state.postReducer)
  const location =useLocation()
  useEffect(() => {
      dispatch(getTimelinePosts(user._id))
  }, [dispatch,user.following.length,posts.length])
  return (

    <div className='Posts'>
      {
        loading  ? <LoadingOutlined style={{ fontSize: '38px',marginTop:"25%",color:"#8e5aff"}} />: location.pathname!=="/home" ?
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