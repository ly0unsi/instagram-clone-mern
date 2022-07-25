import React from 'react'
import RightSide from '../../components/RightSide/RightSide'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/profileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import './Profile.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState,useEffect } from 'react'
import { getUser } from '../../Api/UserApi'
const Profile = () => {
  const params=useParams()
  const profileUserId=params.id
  const [profileUser, setprofileUser] = useState(null)
  const {user}=useSelector((state)=>state.authReducer.authData)
  const {followers}=useSelector((state)=>state.userReducer)
  useEffect(() => {
    const fetchProfile=async ()=>{
      if (profileUserId===user._id){
        setprofileUser(user)
      }else{
        const {data}=await getUser(profileUserId)
        setprofileUser(data)
      }
    }
    fetchProfile()
  }, [profileUserId,user,followers])
  
  return (
  
    <div className="Profile">
       
          <ProfileLeft profileUser={profileUser}/>

          <div className="Profile-center">
              <ProfileCard location="profilePage" profileUser={profileUser}/>
              <PostSide profileUser={profileUser}/>
          </div>

          <RightSide/>
          <ToastContainer />
            
    </div>
    
  )
}

export default Profile