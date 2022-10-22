import React from 'react'
import Profile from '../../img/defaultProfile.png'
import './Post.css'
import { useDispatch, useSelector } from 'react-redux'
import { EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useState } from 'react'
import { format } from "timeago.js";
import { likePost } from '../../Actions/PostAction'
import FollowButton from '../FollowButon/FollowButton'
import { Link, useLocation } from 'react-router-dom'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
import Comments from '../Comments/Comments'
import ShareModal from '../ShareModel/ShareModel';
const Post = ({ post, socket, comments }) => {
  const { user } = useSelector((state) => state.authReducer.authData)

  const [liked, setliked] = useState(post.likes?.includes(user._id))
  const [likes, setlikes] = useState(post.likes?.length)
  const [commentsNumber, setcommentsNumber] = useState(comments.filter((comment) => comment.postId === post._id).length)
  const [shareModelOpened, setshareModelOpened] = useState(false)
  const [deleteModalOpened, setdeleteModalOpened] = useState(false)
  const [editModalOpend, seteditModalOpend] = useState(false)
  const [commentsOpened, setcommentsOpened] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const postMenu = (
    <Menu
      items={[
        {
          label: <button className='border-none px-4 bg-none' onClick={() => seteditModalOpend(true)}>Edit</button>,
          key: '0',
        },
        {
          label: <button className='border-none px-4 bg-none' onClick={() => setdeleteModalOpened(true)}>Delete</button>,
          key: '1',
        }
      ]}
    />
  );
  const sharedPostMenu = (
    <Menu
      items={[

        {
          label: <button className='border-none px-4 bg-none' onClick={() => setdeleteModalOpened(true)}>Delete</button>,
          key: '0',
        }
      ]}
    />
  );

  const handleLikePost = async (id) => {

    if (!liked) {
      socket.emit('sendNotification', {
        receiverName: post.user.username,
        type: 1,
        sender: user,

      })
    }


    post.postOwnerId ? dispatch(likePost(id, { userId: user._id, shared: true })) : dispatch(likePost(id, { userId: user._id, shared: false }))
    setliked((prev) => !prev)
    liked ? setlikes((prev) => prev - 1) : setlikes((prev) => prev + 1)
  }




  return (
    <div className='Post dark:bg-zinc-800 dark:text-gray-50 transition duration-300 flex'>


      <div className="w-100  flex items-center ">
        {post.user && location.pathname == "/home" &&
          <>
            <div className='items-center'>
              <Link to={`/profile/${post.user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img className='w-9 h-9 mr-2 object-cover rounded-full' src={post.user?.profilePicture ? post.user?.profilePicture : Profile} alt="" />
              </Link>
            </div>
            <div className="w-auto ml-1">
              <span className='font-medium text-sm w-[100%]'>
                {post.user?.username}
              </span>
              <span className='float-right text-xs w-[100%] dark:text-gray-400'>{format(post.createdAt)}</span>
            </div>
          </>
        }
        {

          post.user?._id !== user._id ?
            <div className='ml-auto order-2'>
              <FollowButton profile={post.user} />
            </div>
            :
            <div className="ml-auto order-2 w-3">
              <Dropdown overlay={post.owner ? sharedPostMenu : postMenu} trigger={['click']} placement="bottom" arrow={{ pointAtCenter: true }}>
                <a onClick={e => e.preventDefault()} >
                  <Space>
                    <EllipsisOutlined className='dark:text-gray-50' style={{ fontSize: '16px', color: 'black' }} />
                  </Space>
                </a>
              </Dropdown>
            </div>
        }
      </div>

      <span><b>{post.userDesc}</b></span>
      <hr />
      <div className={`shared-post  ${post.owner && "dark:bg-zinc-700 bg-slate-100 ml-6 p-2 rounded-lg"}`}>
        {post.owner &&
          <div className="w-100  flex items-center ">
            <div className='items-center'>
              <Link to={`/profile/${post.owner.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img className='w-9 h-9 mr-2 object-cover rounded-full' src={post.owner?.profilePicture ? post.owner?.profilePicture : Profile} alt="" />
              </Link>
            </div>
            <div className="w-auto ml-1">
              <span className='font-medium text-sm w-[100%]'>
                {post.owner?.username}
              </span>
              <span className='float-right text-xs w-[100%] dark:text-gray-400'>{format(post.post.createdAt)}</span>
            </div>
          </div>
        }
        {post.image &&
          < img src={post.image} alt="" className='object-cover lg:h-[80vh] h-[286px] w-[100%] rounded-xl bg-transparent' />
        }
        <div className="detail mt-2">
          <span><b>{post.name}</b></span>
          {
            <span className='mt-2'>  {post.owner ? post.post?.desc : post?.desc}</span>
          }
        </div>
        {post.post?.image &&
          < img src={post.post?.image} alt="" className='object-cover lg:h-[80vh] h-[286px] w-[100%] rounded-xl bg-transparent' />
        }
      </div>
      <div className="flex gap-2 items-center dark:text-gray-50 transition duration-300">
        {liked ? <HeartFilled onClick={() => handleLikePost(post._id)} className='text-[30px] text-[#8e5aff]' /> : <HeartOutlined onClick={() => handleLikePost(post._id)} style={{ fontSize: "30px", color: "#404040" }} />}
        <span style={{ color: "var(--gray)", fontSize: '12px' }} className='dark:text-gray-300'>{likes} likes</span>
        <svg onClick={() => setcommentsOpened((prev) => !prev)} className="w-8 h-8 dark:text-gray-100 text-zinc-900 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        <span style={{ color: "var(--gray)", fontSize: '12px' }} className='dark:text-gray-300'>{commentsNumber} comments</span>
        {
          !post.post && <><svg onClick={() => setshareModelOpened(true)} className="w-7 h-7 dark:text-gray-100 text-zinc-900 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            <span style={{ color: "var(--gray)", fontSize: '12px' }} className='dark:text-gray-300'>{post.sharesCount} shares</span>
          </>
        }


      </div>



      {
        commentsOpened &&
        <Comments comments={comments} post={post} socket={socket} setcommentsNumber={setcommentsNumber} postId={post._id} />
      }

      <DeleteModal modalOpened={deleteModalOpened} setModalOpened={setdeleteModalOpened} postOwnerId={post.postOwnerId} postId={post._id} />
      {
        post &&
        <EditModal modalOpened={editModalOpend} setModalOpened={seteditModalOpend} post={post} />
      }
      {
        !post.post &&
        <ShareModal modalOpened={shareModelOpened} setModalOpened={setshareModelOpened} post={post} />
      }

    </div>
  )
}

export default Post