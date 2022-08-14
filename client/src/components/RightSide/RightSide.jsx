import React, {useEffect, useState} from 'react'
import './RightSide.css'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendsCard from '../TrendsCard/TrendsCard';
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import ShareModal from '../ShareModal/ShareModal';
const RightSide = ({socket}) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [notifs, setnotifs] = useState([])
  useEffect(() => {
    socket?.on("getNotification",data=>{
      console.log(data);
      setnotifs((prev) => [...prev, data]);
      console.log(notifs);
    })
  }, [socket])
  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <Dropdown.Item> {`${senderName} ${action} your post.`} </Dropdown.Item>
    );
  };

  return (
    <div className="RightSide hidden lg:block col-lg-3">
    <div className="navIcons gap-[20%] justify-center">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <img src={Home} className="w-6" alt="" />
      </Link>
      <UilSetting />
      <div>
      <Dropdown>
          <Dropdown.Toggle className='border-none text-[0px] p-0' variant='none'>
                <img className='w-[1.5rem] h-[1.5rem] ' src={Noti} alt="" />
                {
                        notifs.length >0 &&
                        <div className="counter">{notifs.length}</div>
                }
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {notifs.map((n)=>{
              displayNotification(n)
            })}
        </Dropdown.Menu>
      </Dropdown>
         
      </div>
     
      <img src={Comment} alt="" />
      
    </div>
    <TrendsCard/>
    <button className="button r-button m-auto mt-2" onClick={()=>setModalOpened(true)} >
      Share
    </button>
    <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
   
  </div>
  )
}

export default RightSide