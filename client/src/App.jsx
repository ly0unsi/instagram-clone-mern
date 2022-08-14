
import Auth from "./pages/Auth/Auth";
import 'animate.css';
import { io } from "socket.io-client";
import 'antd/dist/antd.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.css'
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import {Navigate,Routes,Route,location, useLocation, Link} from 'react-router-dom'
import ReactCSSTransitionGroup, { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from "react-redux";
import menu from './img/menu.png'
import "./App.css"
import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar/Navbar";
function App() {
  const user =useSelector((state)=>state.authReducer.authData)
  const [socket, setsocket] = useState(null)
  const location =useLocation()
  const [navOpened, setnavOpened] = useState(false)
  var hours = 6; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
      localStorage.setItem('setupTime', now)
  } else {
      if(now-setupTime > hours*60*60*1000) {
          localStorage.clear()
          localStorage.setItem('setupTime', now);
      }
  }
  useEffect(() => {
    setsocket(io("http://localhost:3001"))
  }, [])
  useEffect(() => {
    // console.log(user);
    socket?.emit("newUser",user?.user?.username)
  
   
  }, [socket,user])
  
  return (
    <div className="App flex flex-col">
       <div className="blur" style={{top:'-18%',right:'0'}}></div>
       <div className="blur" style={{top:'36%',left:'-8%'}}>
       </div>
       <div className="flex items-center gap-[68%] text-[22px]">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span className='font-bold text-[20px] lg:hidden'>
            ShutApp
          </span>
        </Link>
        <img src ={menu} className="float-right lg:hidden cursor-pointer w-8" onClick={()=>setnavOpened(prev=>!prev)}/>
       </div>
        
        <CSSTransition
          in={navOpened}
          timeout={300}
          classNames={{
            enter: 'animate__animated animate__slideInRight',
            enterActive: 'animate__animated animate__slideInRight',
            enterDone: 'animate__animated animate__slideInRight',
            exit: 'animate__animated animate__slideOutRight',
            exitActive: 'animate__animated animate__slideOutRightt',
            exitDone: 'animate__animated animate__slideOutRight',
          }}
            unmountOnExit
        >
                <Navbar setnavOpened={setnavOpened}/>
                      
        </CSSTransition >
        
       
       <TransitionGroup>
          <CSSTransition
                    key={location.pathname}
                    timeout={400}
                    classNames="alert"  
                >
              <Routes>
                <Route  path='/' element={user? <Navigate to="home"/>: <Navigate to="auth"/>}/>
                <Route path='/home' element={user ? <Home socket={socket}/>:<Navigate to ='../auth'/>} />
                <Route path='/auth' element ={user? <Navigate to ='../home' />: <Auth/>}/>
                <Route path='/profile/:username' element={user ?<Profile socket={socket}/>:<Navigate to ='../auth'/>}/>
              </Routes>
          </CSSTransition>
       </TransitionGroup>
      
    </div>
  );
}

export default App;
