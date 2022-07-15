import React from 'react'
import { useSelector } from 'react-redux'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
const ProfileCard = ({location}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const {posts} =useSelector((state)=>state.postReducer)
  const storageLink =process.env.REACT_APP_STORAGE_URL
  return (
    <div className='ProfileCard'>
        <div className="ProfileImages">
          <img src={ user.coverPicture
              ? storageLink + user.coverPicture
              : storageLink + "defaultCover.jpg"
          } alt="" />
          <img src={Profile} alt="" />
        </div>
        <div className="ProfileName">
          <span>
            Zendaya MJ
          </span>
          <span>Senior ui/ux designer</span>
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>6582</span>
              <span>Followings</span>
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