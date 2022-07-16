
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import {Navigate,Routes,Route} from 'react-router-dom'
import { useSelector } from "react-redux";
import "./App.css"
function App() {
  const user =useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App flex flex-col">
       <div className="blur" style={{top:'-18%',right:'0'}}></div>
       <div className="blur" style={{top:'36%',left:'-8%'}}>
       </div>
       <Routes>
        <Route  path='/' element={user? <Navigate to="home"/>: <Navigate to="auth"/>}/>
        <Route path='/home' element={user ? <Home/>:<Navigate to ='../auth'/>} />
        <Route path='/auth' element ={user? <Navigate to ='../home' />: <Auth/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
       </Routes>
      
    </div>
  );
}

export default App;
