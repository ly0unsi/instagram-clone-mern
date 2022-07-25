import React from 'react'
import Profile from '../../img/defaultProfile.png'
import FollowButton from '../FollowButon/FollowButton'
import { Link } from 'react-router-dom'
const User = ({follower}) => {
    const storageLink =process.env.REACT_APP_STORAGE_URL
  return (
    <div className="follower">
        <div>
        <img src={follower.profilePicture ? storageLink + follower.profilePicture: Profile}  alt="" className='followerImage object-cover' />
            <div className="name">
              <Link to={`/profile/${follower._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <span>{follower.username}</span>
              </Link>
            </div>
        </div>
        {
          follower &&  <FollowButton profile={follower}/>
        }
      
    </div>
  )
}

export default User