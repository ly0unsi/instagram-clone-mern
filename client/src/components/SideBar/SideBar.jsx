import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import NavBar from '../NavBar/Navbar';
import '../RightSide/RightSide.css'
import TrendsCard from '../TrendsCard/TrendsCard';

const SideBar = ({ setnavOpened, socket }) => {
  const { posts } = useSelector((state) => state.postReducer)
  const location = useLocation()
  useEffect(() => {
    return () => {
      setnavOpened(false)
    }
  }, [location.pathname])


  return (
    <div className='animate__faster h-[100%] fixed top-0 right-0 z-10 w-[85%] p-2 bg-[#ffffff] lg:hidden shadow-xl overflow-y-scroll dark:bg-zinc-900'>
      <LogoSearch setnavOpened={setnavOpened} isNav={true} />
      <NavBar socket={socket} />
      <TrendsCard />
      <FollowersCard />
    </div>
  )
}

export default SideBar