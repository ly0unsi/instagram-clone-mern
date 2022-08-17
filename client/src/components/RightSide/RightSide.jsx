import React, {useEffect, useState} from 'react'
import './RightSide.css'
import TrendsCard from '../TrendsCard/TrendsCard';

import ShareModal from '../ShareModal/ShareModal';

import NavBar from '../NavBar/Navbar';
const RightSide = ({socket}) => {
  const [modalOpened, setModalOpened] = useState(false)


  return (
    <div className="RightSide hidden lg:block col-lg-3 ">
      
    <NavBar socket={socket}/>
    
    <TrendsCard/>
    <button className="button r-button m-auto mt-2" onClick={()=>setModalOpened(true)} >
      Share
    </button>
    <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
   
  </div>
  )
}

export default RightSide