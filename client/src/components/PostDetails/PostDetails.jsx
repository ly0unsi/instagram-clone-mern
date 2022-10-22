import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPostComments } from '../../Actions/CommentAction'
import { getPost } from '../../Actions/PostAction'
import Comments from '../Comments/Comments'
import NavBar from '../NavBar/Navbar'

const PostDetails = ({ socket }) => {
  const { comments, cloading } = useSelector((state) => state.CommentReducer)
  const { post, pLoading } = useSelector((state) => state.postReducer)
  const [commentsNumber, setcommentsNumber] = useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  const postId = params.id

  useEffect(() => {
    dispatch(getPost(postId))
    dispatch(getPostComments())
  }, [dispatch])

  useEffect(() => {
    setcommentsNumber(comments.filter((comment) => comment.postId === post?._id).length)
  }, [comments])
  //console.log(post);
  return (
    <div className='row h-[100vh] dark:bg-zinc-800 p-3 rounded-md'>
      <div className='hidden lg:block '>
        <div className='flex items-center w-[100%]'>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span className='font-bold text-[35px]'>
              ShutApp
            </span>
          </Link>

          <div className='w-[30rem] ml-auto order-2'>
            <NavBar />
          </div>
        </div>
      </div>
      {
        post?.image &&
        <div className="col-lg-4">
          <img src={post?.image} className="rounded-2xl h-[50vh] lg:h-[70vh] lg:w-[100%] object-cover" alt="" />
        </div>
      }

      <div className="col-lg-8 lg:pl-4">
        <div className='text-[20px]'>
          {post?.desc}
        </div>
        <div className='flex gap-2 items-center pb-2'>

          <svg className="w-8 h-8 dark:text-gray-100 text-zinc-900 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <span style={{ color: "var(--gray)", fontSize: '12px' }} className='dark:text-gray-300'>{commentsNumber} comments</span>

        </div>
        {
          !pLoading ?

            <Comments comments={comments} post={post} socket={socket} setcommentsNumber={setcommentsNumber} postId={post._id} />
            : "waiting comments"
        }

      </div>
    </div>
  )
}

export default PostDetails