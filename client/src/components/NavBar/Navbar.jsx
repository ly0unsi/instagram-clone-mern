import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import { UilSetting } from "@iconscout/react-unicons";
import '../RightSide/RightSide.css'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import TrendsCard from '../TrendsCard/TrendsCard';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = ({setnavOpened}) => {
    const {user}=useSelector((state)=>state.authReducer.authData)
  return (
    <div className='animate__faster h-[100%] fixed top-0 right-0 z-10 w-[85%] p-2 bg-[#ffffff] lg:hidden shadow-xl'>
        <LogoSearch setnavOpened={setnavOpened} isNav={true} />
        <div className="navIcons gap-[15%] justify-center">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src={Home} className="w-6" alt="" />
            </Link>
            <UilSetting />
            <div>
            <Dropdown>
                <Dropdown.Toggle className='border-none text-[0px] p-0' variant='none'>
                      <img className='w-[1.5rem] h-[1.5rem] ' src={Noti} alt="" />
                      {/* {
                              notifs.length >0 &&
                              <div className="counter">{notifs.length}</div>
                      } */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item> Home</Dropdown.Item>
                  <Dropdown.Item> Chat</Dropdown.Item>
                  <Dropdown.Item> Settings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              
            </div>
          
            <img src={Comment} alt="" />
            
          </div>
          <TrendsCard/>
  
        <FollowersCard/>
    </div>
  )
}

export default Navbar