import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import profileImage from '../../img/defaultProfile.png'
import { ArrowRightOutlined } from '@ant-design/icons'
import { UilSearch } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../Api/UserApi'
import { getTrends } from '../../Api/TrendApi'
import { getTrendPosts } from '../../Actions/TrendAction'
import { useDispatch } from 'react-redux'
const LogoSearch = ({ isNav, setnavOpened }) => {
  const [tab, settab] = useState("users")
  const [tabOpend, settabOpend] = useState(false)
  const [input, setinput] = useState('')
  const dispatch = useDispatch()
  const [users, setusers] = useState([])
  const [filteredUsers, setfilteredUsers] = useState([])
  const [filtredTags, setfiltredTags] = useState([])

  const [tags, settags] = useState([])
  const handleGetTrendPosts = (id) => {
    dispatch(getTrendPosts(id))
  }
  const showuser = (user, key) => {
    return (
      <div key={key} className='users bg-zinc-900 mt-2 rounded-md p-2'>
        <div className='flex items-center'>
          <div className='relative'>
            <img src={user.profilePicture ? user.profilePicture : profileImage} className='w-8 h-8 relative rounded-full mr-2 object-cover' alt="" />

          </div>
          <span className='text-[12px]'>
            <Link to={"/profile/" + user.username} style={{ textDecoration: "none", color: "inherit" }} >
              {user.username}
            </Link>
          </span>
        </div>
      </div>
    )
  }
  const showTags = (tag, key) => {
    return (
      <div className='users bg-zinc-900 mt-2 rounded-md p-2' key={key}>
        <div className="trend cursor-pointer" onClick={() => handleGetTrendPosts(tag._id)}>
          <span>{tag.name}</span>
          <span>{tag.trendPosts} shares</span>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setinput(e.target.value)
    if (e.target.value.trim().length !== 0) {
      if (tab === "users")
        setfilteredUsers(users.filter((user) => user.username.toLowerCase().includes(e.target.value.toLowerCase())))
      else
        setfiltredTags(tags.filter((tag) => tag.name.toLowerCase().includes(e.target.value.toLowerCase())))

    } else {
      setfiltredTags([])
      setfilteredUsers([])
    }
  }
  useEffect(() => {
    if (input) {
      setfilteredUsers(users.filter((user) => user.username.toLowerCase().includes(input.toLowerCase())))
      setfiltredTags(tags.filter((tag) => tag.name.toLowerCase().includes(input.toLowerCase())))
    }

  }, [tab])

  const getUsers = async () => {
    const { data } = await getAllUsers()
    setusers(data)
    // setfilteredUsers(data)
  }
  const handlegetTrends = async () => {
    const { data } = await getTrends()
    settags(data)
    // setfiltredTags(data)
  }
  useEffect(() => {
    if (tabOpend) {
      getUsers()
      handlegetTrends()

    }


  }, [tabOpend])

  return (
    <div className='LogoSearch items-center'>
      {
        isNav ? <ArrowRightOutlined className=' dark:text-gray-100 pl-3' onClick={() => setnavOpened(false)} /> : <span className='font-bold text-[24px] ml-3'>
          ShutApp
        </span>
      }
      <div className="Search dark:bg-zinc-800 relative ml-auto order-2 w-[78%]">
        <input type="text" placeholder='#Explore' value={input} onChange={handleChange} onFocus={() => settabOpend(true)} />
        <div className="s-icon">
          <UilSearch />
        </div>
        {
          tabOpend &&
          <div onBlur={() => settabOpend(false)} className="absolute shadow-lg h-auto w-[100%] bg-zinc-800 top-12 z-10 p-4 rounded-lg left-0">
            <div className='flex  items-center header'>
              <span className={`w-[50%] text-center border-right-1px cursor-pointer ${tab === "users" ? "text-slate-50 font-bold" : "text-zinc-400"}`} onClick={() => settab("users")}>Users</span>
              <span className={`ml-auto order-2 w-[50%] text-center cursor-pointer ${tab === "tags" ? "text-slate-50 font-bold" : "text-zinc-400"}`} onClick={() => settab("tags")} >Tags</span>
            </div>
            {
              tab === "users" ?
                filteredUsers?.map((user, id) => showuser(user, id))
                :
                filtredTags?.map((tag, id) => showTags(tag, id))
            }

          </div>
        }

      </div>
    </div>
  )
}

export default LogoSearch