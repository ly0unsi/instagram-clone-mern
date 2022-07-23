import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from '../../Actions/UserAction'
const FollowButton = ({profile}) => {
    const {user}=useSelector((state)=>state.authReducer.authData) 
    const [isFollowed, setisFollowed] = useState(profile?.followers.includes(user._id))
    const dispatch=useDispatch()
    const follow=(id)=>{
        setisFollowed((prev)=>!prev)
        dispatch(followUser(id,user._id))
    }
    
  return (
    <button className={isFollowed ? "bg-white button fc-button":"button fc-button"} onClick={()=>follow(profile._id)}>
    {isFollowed ?"Unfollow" : "Follow" }
</button>
  )
}

export default FollowButton