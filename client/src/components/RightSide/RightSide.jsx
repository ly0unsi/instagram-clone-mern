import React, {useEffect, useState} from 'react'
import './RightSide.css'
import TrendsCard from '../TrendsCard/TrendsCard';
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import ShareModal from '../ShareModal/ShareModal';
import {BulbOutlined}  from '@ant-design/icons'
import { Switch } from 'antd';
import useDarkMode from '../../Utils/UseDark';
const RightSide = ({socket}) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [notifs, setnotifs] = useState([])
  const [colorTheme,settheme]=useDarkMode()
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
    <div className="RightSide hidden lg:block col-lg-3 ">
    <div className="navIcons gap-[13%] justify-center">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      </Link>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      <div>
      <Dropdown>
          <Dropdown.Toggle className='border-none text-[0px] p-0' variant='none'>
          <svg className="w-6 h-6 dark:text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
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
     
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      <div>
      <Switch
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                defaultChecked
                className='bg-[#8e5aff]'
                onClick={()=>settheme(colorTheme)}
              />
      </div>
      
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