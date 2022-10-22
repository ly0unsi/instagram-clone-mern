import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from '../../Actions/UserAction'
const FollowButton = ({ profile }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  //console.log(profile);
  const [isFollowed, setisFollowed] = useState(user.following.includes(profile?._id))
  const dispatch = useDispatch()
  const follow = async (id) => {
    setisFollowed((prev) => !prev)
    dispatch(followUser(id, user._id))
  }

  return (
    <button className={isFollowed ? "unfollow-butt dark:bg-zinc-900 dark:text-white border-[#8e5aff]" : "button fc-button"} onClick={() => follow(profile?._id)}>
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  )
}

export default FollowButton