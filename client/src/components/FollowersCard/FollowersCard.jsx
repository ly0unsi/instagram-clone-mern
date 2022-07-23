import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import './FollowersCard.css'
import { getFollowers } from '../../Actions/UserAction'
const FollowersCard = () => {
    const {user}=useSelector((state)=>state.authReducer.authData)
    const dispatch =useDispatch()
    const {followers}=useSelector((state)=>state.userReducer)
    useEffect(() => {
      dispatch(getFollowers(user._id))
    },[dispatch])  
  return (
    <div className='FollowersCard'>
        <h3>Who is following you</h3>
        {followers.map((follower,id)=>{
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