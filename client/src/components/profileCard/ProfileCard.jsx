import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/defaultProfile.png'
import './ProfileCard.css'
const ProfileCard = ({location}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const {posts} =useSelector((state)=>state.postReducer)
  const storageLink =process.env.REACT_APP_STORAGE_URL
  return (
    <div className='ProfileCard mt-4'>
        <div className="ProfileImages">
          <img src={ user.coverPicture
              ? storageLink + user.coverPicture
              : Cover
          } alt="" />
          <img src={user.profilePicture ? storageLink + user.profilePicture: Profile} alt="" />
        </div>
        <div className="ProfileName">
          <span>
            {user.firstname} {user.lastname}
          </span>
          <span>{user.worksAt}</span>
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.followings? user.followings.length :0}</span>
              <span>Followings</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers? user.followers.length:0}</span>
              <span>Followers</span>
            </div>
            {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
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
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard