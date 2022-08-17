import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/defaultProfile.png'
import FollowButton from '../FollowButon/FollowButton'
import './ProfileCard.css'
const ProfileCard = ({location,profileUser}) => {
  const {posts} =useSelector((state)=>state.postReducer)

  const {user}=useSelector((state)=>state.authReducer.authData)
  return (
    <div className='ProfileCard mt-4 dark:bg-zinc-800 dark:text-gray-50 transition duration-300 pb-10'>
        <div className="ProfileImages">
          <img src={ profileUser?.coverPicture
              ?  profileUser?.coverPicture
              : Cover
          } alt="" className='object-cover h-[260px]' />
          <img src={profileUser?.profilePicture ? profileUser?.profilePicture: Profile} alt="" className='object-cover'  />
        </div>
        <div className="ProfileName">
          <span>
            {profileUser?.firstname} {profileUser?.lastname}
          </span>
         
          <span className='dark:text-gray-300'>{profileUser?.worksAt}</span>
          {profileUser &&
            profileUser._id!==user._id &&
            <FollowButton profile={profileUser}/>
          }
         
        </div>
        <div className="followStatus ">
          <hr />
          <div>
            <div className="follow">
              <span>{profileUser?.following? profileUser?.following.length :0}</span>
              <span className='dark:text-gray-300'>Followings</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{profileUser?.followers? profileUser?.followers.length:0}</span>
              <span className='dark:text-gray-300'>Followers</span>
            </div>
            {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === profileUser?._id).length
                }</span>
                <span className='dark:text-gray-300'>Posts</span>
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
          <Link to={`/profile/${profileUser?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard