import React, { useEffect } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import { ToastContainer } from 'react-toastify';
import { io } from "socket.io-client";
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
import { useSelector } from 'react-redux';

const Home = ({ socket }) => {
  return (
    <div className='row'>
      <ProfileSide />
      <PostSide socket={socket} />
      <RightSide socket={socket} />
      <ToastContainer />
    </div>
  )
}

export default Home