import React from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import {ArrowRightOutlined} from '@ant-design/icons'
import {UilSearch} from '@iconscout/react-unicons'
const LogoSearch = ({isNav,setnavOpened}) => {
  return (
    <div className='LogoSearch items-center gap-[2rem] lg:gap-[10px]'>
      {
        isNav ? <ArrowRightOutlined  className=' dark:text-gray-100 pl-3' onClick={()=>setnavOpened(false)}/>:<span className='font-bold text-[24px] ml-3'>
        ShutApp
      </span>
      }
        <div className="Search dark:bg-zinc-800">
            <input type="text"  placeholder='#Explore' />
            <div className="s-icon">
                <UilSearch/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch