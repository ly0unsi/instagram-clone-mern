import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import './ProfileSide.css'
const ProfileSide = () => {
  return (
    <div className='profileSide columns-1'>
        <LogoSearch/>
        <ProfileCard location="HomePage"/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide