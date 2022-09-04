import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SendOutlined } from '@ant-design/icons';
import Comment from './Comment/Comment'
import { useState } from 'react';
import { addComment } from '../../Actions/CommentAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Comments = ({ comments, postId, setcommentsNumber, socket, post }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  const [formData, setformData] = useState({
    body: "",
    postId: postId,
    userId: user._id,
    senderId: user._id,
    receverId: post.user._id
  })
  const HandleComment = async () => {
    dispatch(addComment(formData))
    resetForm()
    setcommentsNumber((prev) => prev += 1)
    socket.emit('sendNotification', {
      receiverName: post.user.username,
      type: 2,
      sender: user,
    })
  }
  const resetForm = () => {
    setformData({ ...formData, body: "" })
  }
  const handleChange = (e) => {
    setformData({ ...formData, body: e.target.value })
  }

  return (
    <div className='ml-5'>
      {
        comments.filter((comment) => comment.postId === postId) &&
        <span className='text-md font-semibold '>Comments</span>
      }
      <div className='h-[193px] overflow-y-scroll'>
        <TransitionGroup component="ul">
          {
            comments.filter((comment) => comment.postId === postId).map((comment, key) => {
              return (
                <CSSTransition key={key} timeout={700} classNames="alert">
                  <div key={key}>
                    <Comment comment={comment} setcommentsNumber={setcommentsNumber} postId={postId} />
                  </div>
                </CSSTransition>
              )

            })

          }
        </TransitionGroup>
      </div>


      <div className='flex relative'>
        <SendOutlined onClick={HandleComment} className='absolute right-3 top-2 cursor-pointer text-lg z-10' />
        <textarea onChange={handleChange} value={formData.body} className='leaveComment outline-none' placeholder="Leave a comment" cols="30" rows="10"></textarea>
      </div>

    </div>
  )
}

export default Comments