import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import { LoadingOutlined } from '@ant-design/icons';
import './FollowersCard.css'
import { getFollowers } from '../../Actions/UserAction'
const FollowersCard = () => {
    const {user}=useSelector((state)=>state.authReducer.authData)
    const dispatch =useDispatch()
    const {followers,fetching}=useSelector((state)=>state.userReducer)
    useEffect(() => {
      dispatch(getFollowers(user._id))
    },[dispatch,user.following.length])  
  return (
    <div className='FollowersCard'>
        <h3>Who is following you</h3>
        {
          fetching  ?<LoadingOutlined style={{ fontSize: '25px',color:"#8e5aff"}} twoToneColor="#8e5aff"/>: followers.map((follower,id)=>{
            return (
                <div key={id}>
                    <User follower={follower}/>
                </div>
            )
        })}
        
        
    </div>
  )
}

export default FollowersCard