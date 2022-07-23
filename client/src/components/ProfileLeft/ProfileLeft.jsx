import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../logoSearch/LogoSearch'
const ProfileLeft = ({profileUser}) => {
  return (
   <div className="ProfileSide">
       <LogoSearch/>
       <InfoCard profileUser={profileUser}/>
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft