import React from 'react'
import { useSelector } from 'react-redux'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import './ProfileSide.css'
const ProfileSide = () => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  return (
    <div className='profileSide columns-1'>
        <LogoSearch/>
        <ProfileCard location="HomePage" profileUser={user}/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide