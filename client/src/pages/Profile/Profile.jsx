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
const Profile = ({socket}) => {
  const params=useParams()
  const username=params.username
  const [profileUser, setprofileUser] = useState(null)
  const {user}=useSelector((state)=>state.authReducer.authData)
  const {followers}=useSelector((state)=>state.userReducer)
  useEffect(() => {
    const fetchProfile=async ()=>{
      if (username===user.username){
        setprofileUser(user)
      }else{
        const {data}=await getUser(username)
        setprofileUser(data)
      }
    }
    fetchProfile()
  }, [username,user,user.following.length])
  
  return (
  
   <div className="Profile">
   {profileUser && 
   <>
   
          <ProfileLeft profileUser={profileUser}/>

        <div className="Profile-center">
            <ProfileCard location="profilePage" profileUser={profileUser}/>
            <PostSide socket={socket} profileUser={profileUser}/>
        </div>

        <RightSide socket={socket}/>
        <ToastContainer />
   </>
       
   }
</div>
  
    
    
  )
}

export default Profile