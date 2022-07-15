import React from 'react'
import RightSide from '../../components/RightSide/RightSide'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/profileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import './Profile.css'
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft/>

      <div className="Profile-center">
          <ProfileCard location="profilePage"/>
          <PostSide/>
      </div>

      <RightSide/>
    </div>
    
  )
}

export default Profile