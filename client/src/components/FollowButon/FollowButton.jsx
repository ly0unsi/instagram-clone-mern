import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from '../../Actions/UserAction'
const FollowButton = ({profile}) => {
    const {user}=useSelector((state)=>state.authReducer.authData) 
    const [isFollowed, setisFollowed] = useState(user.following.includes(profile._id))
    const dispatch=useDispatch()
    const follow=async (id)=>{
        setisFollowed((prev)=>!prev)
        dispatch(followUser(id,user._id))
    }
    useEffect(() => {
     
    }, [user])
  return (
    <button className={isFollowed ? "unfollow-butt":"button fc-button"} onClick={()=>follow(profile._id)}>
    {isFollowed ?"Unfollow" : "Follow" }
</button>
  )
}

export default FollowButton