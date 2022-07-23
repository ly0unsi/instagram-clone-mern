import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/defaultProfile.png'
import FollowButton from '../FollowButon/FollowButton'
import './ProfileCard.css'
const ProfileCard = ({location,profileUser}) => {
  const {posts} =useSelector((state)=>state.postReducer)
  const storageLink =process.env.REACT_APP_STORAGE_URL
  const {user}=useSelector((state)=>state.authReducer.authData)
  return (
    <div className='ProfileCard mt-4'>
        <div className="ProfileImages">
          <img src={ profileUser?.coverPicture
              ? storageLink + profileUser?.coverPicture
              : Cover
          } alt="" className='object-cover' />
          <img src={profileUser?.profilePicture ? storageLink + profileUser?.profilePicture: Profile} alt="" className='object-cover'  />
        </div>
        <div className="ProfileName">
          <span>
            {profileUser?.firstname} {profileUser?.lastname}
          </span>
         
          <span>{profileUser?.worksAt}</span>
          {
            profileUser?._id!==user._id &&
            <FollowButton profile={profileUser}/>
          }
         
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{profileUser?.followings? profileUser?.followings.length :0}</span>
              <span>Followings</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{profileUser?.followers? profileUser?.followers.length:0}</span>
              <span>Followers</span>
            </div>
            {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === profileUser?._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${profileUser?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard