import React, { useEffect, useState } from 'react'
import {BulbOutlined,CheckOutlined}  from '@ant-design/icons'
import Dropdown from 'react-bootstrap/Dropdown';
import '../RightSide/RightSide.css'
import profileImage from '../../img/defaultProfile.png'
import { EllipsisOutlined ,HeartFilled,HeartOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { Link  } from 'react-router-dom'
import { Switch } from 'antd'
import { getNots, readNot,unreadedNots } from '../../Api/PostApi'
import useDarkMode from '../../Utils/UseDark';
const NavBar = ({socket}) => {
    const [colorTheme,settheme]=useDarkMode()
    const [notifs, setnotifs] = useState([])
   
    const [unreaded, setunreaded] = useState([])
    const {user}=useSelector((state)=>state.authReducer.authData)
    const handleRead=async ()=>{
      setunreaded([])
      await readNot(user._id)
    }

    useEffect(() => {
      socket?.on("getNotification", async(datan) => {
        const {data:nots}=await getNots(user._id)
        setnotifs(nots)
        const {data:unreadedN}=await unreadedNots(user._id)
        setunreaded(unreadedN)
      });
    }, [socket]);
     useEffect(async () => {
      const {data:nots}=await getNots(user._id)
      setnotifs(nots)
      const {data:unreadedN}=await unreadedNots(user._id)
      setunreaded(unreadedN)
     }, [])

    const displayNotification = ({ sender, type,postId },key) => {

        let action;
        let icon
        if (type === 1) {
          action = "liked";
          icon=<HeartFilled  className="w-3 h-3 text-red-500 cursor-pointer absolute bottom-0 right-2"/>
        } else if (type === 2) {
          action = "commented";
          icon= <svg  className="w-4 h-4 text-blue-500 cursor-pointer absolute bottom-0 right-1"  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        } else {
          action = "shared";
        }
        return (
         
          <Dropdown.Item key={key} className='pl-1 dark:text-gray-50 hover:bg-zinc-800'>
             <div className='flex items-center'>
              <div className='relative'>
              <img src={sender.profilePicture? sender.profilePicture : profileImage} className='w-9 h-9 relative rounded-full mr-2 object-cover' alt="" />
              {
                icon
              }
              </div>
                <span className='text-[12px]'>
                  <Link to={`/post/${postId}`}  style={{ textDecoration: "none", color: "inherit" }} >
                      {`${sender.username} ${action} your post.`}
                    </Link>
                </span>
             </div>
          </Dropdown.Item>
           
        );
      };      
    useEffect(() => {
        socket?.on("getNotification", async(datan) => {
          const {data:nots}=await getNots(user._id)
          setnotifs(nots)
          const {data:unreadedN}=await unreadedNots(user._id)
          setunreaded(unreadedN)
        });
      }, [socket]);
       useEffect(async () => {
        const {data:nots}=await getNots(user._id)
        setnotifs(nots)
        const {data:unreadedN}=await unreadedNots(user._id)
        setunreaded(unreadedN)
       }, [])
  return (
    <div className="navIcons gap-[10%] justify-center">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </Link>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <div>
            <Dropdown>
              <div className='relative'>
              <Dropdown.Toggle  className='border-none text-[0px] p-0' variant='none'>
                <svg onClick={handleRead} className="w-6 h-6 dark:text-gray-50 stretched-link" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      {
                          unreaded.length !==0 &&
                          <div className="counter">
                            { unreaded.filter((n)=>n.receverId===user._id).length }
                            </div>
                      }
                </Dropdown.Toggle>
              </div>
                
                <Dropdown.Menu className='w-[220px] dark:bg-zinc-900 '>
                  { notifs.filter((n)=>n.receverId===user._id).map((n,key)=>displayNotification(n,key))}
                </Dropdown.Menu>
            </Dropdown>
              
            </div>
          
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <Switch
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                defaultChecked
                className='bg-[#8e5aff]'
                onClick={()=>settheme(colorTheme)}
              />
          </div>
  )
}

export default NavBar