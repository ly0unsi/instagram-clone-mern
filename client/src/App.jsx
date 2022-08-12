
import Auth from "./pages/Auth/Auth";
import 'animate.css';
import { io } from "socket.io-client";
import 'antd/dist/antd.min.css'
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import {Navigate,Routes,Route,location, useLocation} from 'react-router-dom'
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import { useSelector } from "react-redux";
import "./App.css"
import { useEffect, useState } from "react";
function App() {
  const user =useSelector((state)=>state.authReducer.authData)
  const [socket, setsocket] = useState(null)
  const location =useLocation()
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
