import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
      <ProfileSide/>
      <PostSide page="homePage"/>
      <RightSide/>
      <ToastContainer />
    </div>
  )
}

export default Home