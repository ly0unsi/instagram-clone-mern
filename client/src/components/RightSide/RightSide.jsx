import React, {useEffect, useState} from 'react'
import './RightSide.css'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendsCard from '../TrendsCard/TrendsCard';
import {Link} from 'react-router-dom'
import ShareModal from '../ShareModal/ShareModal';
import { Dropdown, Space } from 'antd';
const RightSide = ({socket}) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [notifs, setnotifs] = useState([])
  useEffect(() => {
    socket?.on("getNotification",data=>{
      setnotifs(prev =>[...prev,data])
    })
  }, [socket])
  const displayNotification = ({ senderName, type },key) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
        <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const menu =()=>{};

  return (
    <div className="RightSide columns-3">
    <div className="navIcons">
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <img src={Home} className="w-6" alt="" />
      </Link>
      <UilSetting />
      <div>
      <Dropdown overlay={menu} trigger={['click']} placement="bottom" arrow={{ pointAtCenter: true }}>
          <a onClick={e => e.preventDefault()} >
            <Space>
            <img src={Noti} alt="" />
                  {
                    notifs.length >0 &&
                    <div className="counter">{notifs.length}</div>
                  }
            </Space>
          </a>
        </Dropdown>
         
      </div>
     
      <img src={Comment} alt="" />
    </div>
    <TrendsCard/>
    <button className="button r-button" onClick={()=>setModalOpened(true)} >
      Share
    </button>
    <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
   
  </div>
  )
}

export default RightSide