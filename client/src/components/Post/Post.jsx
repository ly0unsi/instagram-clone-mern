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
import { useLocation } from 'react-router-dom'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
import Comments from '../Comments/Comments'
const Post = ({post,socket}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const comments =useSelector((state)=>state.CommentReducer.comments)
  const [liked, setliked] = useState(post.likes?.includes(user._id))
  const [likes, setlikes] = useState(post.likes?.length)
  const [commentsNumber, setcommentsNumber] = useState(comments.length)
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
    !liked &&
    socket.emit('sendNotification',{
      senderName:user.username,
      receiverName:post.user.username,
      type:1
    })
    liked ? setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
    dispatch (likePost(id,user._id))
  }
  useEffect(() => {
    dispatch (getPostComments(post._id))
  }, [dispatch])
  
  return (
    <div className='Post'>

      {  post.user && location.pathname=="/home" && 
        <div className={post.user?._id !== user._id ? "w-100  flex items-center gap-[70%]":"w-100  flex items-center gap-[82%]"}> 
        <div className='flex items-center'>
            <img className='w-9 h-9 mr-2 object-cover rounded-full' src={post.user?.profilePicture ? post.user?.profilePicture: Profile} alt="" />
            <span className='font-medium text-sm'>
            {post.user?.username}
            </span> 

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
                    <EllipsisOutlined style={{ fontSize: '16px', color: 'black' }} />
                  </Space>
                </a>
              </Dropdown>
          </div>
         
             
        }
       
        
      </div>
      }
      
        <img src={post.image && post.image} alt="" className='object-cover'  />
            <div className="flex gap-2 items-center">
                {liked ?<HeartFilled onClick={()=>like(post._id)} style={{fontSize:"30px",color:"#8e5aff"}}/> :<HeartOutlined onClick={()=>like(post._id)} style={{fontSize:"30px",color:"#404040"}} />}
                <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>
                <img src={Comment} className='cursor-pointer' onClick={()=>setcommentsOpened((prev)=>!prev)} alt="" />
                <span style={{color: "var(--gray)", fontSize: '12px'}}>{commentsNumber} comments</span>
                <img src={Share} alt="" />
                <span className='float-right text-xs'>{moment(post.createdAt).startOf('hour').fromNow()}</span>
            </div>
          
            
            <div className="detail border-b-2">
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