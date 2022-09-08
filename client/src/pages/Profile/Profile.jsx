import React from 'react'
import RightSide from '../../components/RightSide/RightSide'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/profileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import './Profile.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import { getUser } from '../../Api/UserApi'
import InfoCard from '../../components/InfoCard/InfoCard'
const Profile = ({ socket }) => {
  const params = useParams()
  const username = params.username
  const [profileUser, setprofileUser] = useState(null)
  const { user } = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    const fetchProfile = async () => {
      if (username === user.username) {
        setprofileUser(user)
      } else {
        const { data } = await getUser(username)
        setprofileUser(data)
      }
    }
    fetchProfile()
  }, [username, user, user.following.length])

  return (

    <div className="Profile">
      {profileUser &&
        <div className='col-12'>
          < div className='row'>

            <ProfileLeft profileUser={profileUser} />

            <div className="Profile-center col-sm-12 col-lg-6 lg:px-3 ">
              <ProfileCard location="profilePage" profileUser={profileUser} />
              <div className='lg:hidden'>
                <InfoCard profileUser={profileUser} />
              </div>
            </div>

            <RightSide socket={socket} />

            <ToastContainer />
          </div>
          <div className="row m-auto justify-center mt-2 ">
            <PostSide socket={socket} profileUser={profileUser} />
          </div>
        </div>
      }
    </div>



  )
}

export default Profile