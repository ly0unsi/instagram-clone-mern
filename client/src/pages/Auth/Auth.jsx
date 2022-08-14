import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";
import {useDispatch, useSelector} from 'react-redux'
import Logo from "../../img/logo.png";
import { login, signup } from "../../Actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [data, setdata] = useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
  const [confirmPass, setconfirmPass] = useState(true)
  const [buttDis,setButtDis]=useState(false)
  const [errorMsg,setErrorMsg]=useState(null)

  const loading =useSelector((state)=>state.authReducer.loading)
  const error =useSelector((state)=>state.authReducer.error)
  const dispatch=useDispatch()


  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(isSignUp){
      dispatch(signup(data))
    }else{
      dispatch(login(data))
    }
  }

  const resetForm =()=>{
    setdata({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
  }
  useEffect(()=>{
    if (data.password!==data.confirmpass && isSignUp) {
      setconfirmPass(false)
      setButtDis(true)
     }else{
       setconfirmPass(true)
       setButtDis(false)
     }
    
  },[data.confirmpass,data.password,isSignUp])
  return (
    <div className="Auth row lg:px-44">
    {/* left side */}
    <ToastContainer />

    <div className="a-left col-lg-6">
      <img src={Logo} alt="" />

      <div className="Webname">
        <h1>ShutApp</h1>
        <h6>Explore the ideas throughout the world</h6>
      </div>
    </div>

    {/* right form side */}

    <div className="a-right col-lg-6">
      <form className="infoForm authForm" >
        <h3>{isSignUp ? "Register" : "Login"}</h3>
        {isSignUp && (
          <div>
            <input
              required
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              onChange={handleChange}
              value={data.firstname}
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              onChange={handleChange}
              value={data.lastname}
            />
          </div>
        )}

        <div>
          <input
            required
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
          
            value={data.username}         
            onChange={handleChange}  
          />
        </div>
        <div>
          <input
            required
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
          
            value={data.password}
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              required
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
           
              value={data.confirmpass}
              onChange={handleChange}
            />
          )}
        </div>

        <span
          style={{
            color: "red",
            fontSize: "12px",
            alignSelf: "flex-end",
            marginRight: "5px",
            display:confirmPass ? "none":"block",
          }}
        >
          *Confirm password is not same
        </span>
        {errorMsg &&
               <span
               style={{
                 color: "red",
                 fontSize: "12px",
                 alignSelf: "flex-end",
                 marginRight: "5px",
                 display:"block"
               }}
             >
              {errorMsg}
             </span>
        }
   
        <div>
          <span
            style={{
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              setIsSignUp((prev) => !prev);
              resetForm()
            }}
          >
            {isSignUp
              ? "Already have an account Login"
              : "Don't have an account Sign up"}
          </span>
          <button
            className="button infoButton"
            type="Submit"
           
            disabled={isSignUp? buttDis : loading}
            onClick={handleSubmit}
          >
            {loading ? "Loding":isSignUp ? "SignUp" : "Login"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};
export default Auth;