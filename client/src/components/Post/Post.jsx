import React from 'react'
import Profile from '../../img/defaultProfile.png'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { EllipsisOutlined ,HeartFilled,HeartOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useState } from 'react'
import { getPostComments,  } from '../../Actions/CommentAction'
import {likePost} from '../../Actions/PostAction'
import { useEffect } from 'react'
import FollowButton from '../FollowButon/FollowButton'
import { Link, useLocation } from 'react-router-dom'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
import Comments from '../Comments/Comments'
const Post = ({post,socket}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const comments =useSelector((state)=>state.CommentReducer.comments)
  const [liked, setliked] = useState(post.likes?.includes(user._id))
  const [likes, setlikes] = useState(post.likes?.length)
  const [commentsNumber, setcommentsNumber] = useState(comments.filter((comment)=>comment.postId===post._id).length)
  const [deleteModalOpened, setdeleteModalOpened] = useState(false)
  const [editModalOpend, seteditModalOpend] = useState(false)
  const [commentsOpened, setcommentsOpened] = useState(false)
  const location =useLocation()
  const dispatch =useDispatch()
  const menu = (
    <Menu
      items={[
        {
          label: <button className='border-none px-4 bg-none' onClick={()=>seteditModalOpend(true)}>Edit</button>,
          key: '0',
        },
        {
          label: <button className='border-none px-4 bg-none' onClick={()=>setdeleteModalOpened(true)}>Delete</button>,
          key: '1',
        }
      ]}
    />
  );

  const like=(id)=>{
    setliked((prev)=>!prev)
    // if(!liked){
    //   socket.emit('sendNotification',{
    //     senderName:user.username,
    //     receiverName:post.user.username,
    //     type:1
    //   })
    // }
    
    liked ? setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
    dispatch (likePost(id,user._id))
  }
 
  useEffect(() => {
    dispatch (getPostComments(post._id))
  }, [dispatch])
  
  return (
    <div className='Post dark:bg-zinc-800 dark:text-gray-50 transition duration-300'>

      {  post.user && location.pathname=="/home" && 
        <div className={post.user?._id !== user._id ? "w-100  flex items-center ":"w-100  flex items-center "}> 
            <div className='items-center'>
                <Link to={`/profile/${post.user.username}`}  style={{ textDecoration: "none", color: "inherit" }}>
                  <img className='w-9 h-9 mr-2 object-cover rounded-full' src={post.user?.profilePicture ? post.user?.profilePicture: Profile} alt="" />
                </Link>
            </div>
            <div className="w-[100%] ml-1">
                    <span className='font-medium text-sm w-[100%]'>
                    {post.user?.username}
                    </span> 
                    <span className='float-right text-xs w-[100%] dark:text-gray-400'>{moment(post.createdAt).startOf('hour').fromNow()}</span>
            </div>
           
       
       
        {
        
          post.user?._id !== user._id ?
          <div className='float-right ml-4'>
            <FollowButton profile={post.user} />
          </div>
          :
          <div className="float-right w-3 ">
            <Dropdown overlay={menu} trigger={['click']} placement="bottom" arrow={{ pointAtCenter: true }}>
                <a onClick={e => e.preventDefault()} >
                  <Space>
                    <EllipsisOutlined className='dark:text-gray-50' style={{ fontSize: '16px', color: 'black' }} />
                  </Space>
                </a>
              </Dropdown>
          </div>
        }
      </div>
      }
      
        <img src={post.image && post.image} alt="" className='object-cover'  />
            <div className="flex gap-2 items-center dark:text-gray-50 transition duration-300">
                {liked ?<HeartFilled onClick={()=>like(post._id)} style={{fontSize:"30px",color:"#8e5aff"}}/> :<HeartOutlined onClick={()=>like(post._id)} style={{fontSize:"30px",color:"#404040"}} />}
                <span style={{color: "var(--gray)", fontSize: '12px'}} className='dark:text-gray-300'>{likes} likes</span>
                <svg onClick={()=>setcommentsOpened((prev)=>!prev)} className="w-8 h-8 dark:text-gray-300 text-zinc-900 cursor-pointer"  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span style={{color: "var(--gray)", fontSize: '12px'}} className='dark:text-gray-300'>{commentsNumber} comments</span>
                <img src={Share} alt="" />
              
            </div>
          
            
            <div className="detail border-b-2 dark:border-b-zinc-900">
                <span><b>{post.name}</b></span>
                <span> {post.desc}</span>
            </div>
            {
              commentsOpened &&
              <Comments comments={comments} setcommentsNumber={setcommentsNumber} postId={post._id}/>
            }
           
            <DeleteModal modalOpened={deleteModalOpened} setModalOpened={setdeleteModalOpened} postOwnerId={post.userId} postId={post._id}/>
            {
              post &&
                     <EditModal modalOpened={editModalOpend} setModalOpened={seteditModalOpend} post={post} />
            }
            
    </div>
  )
}

export default Post