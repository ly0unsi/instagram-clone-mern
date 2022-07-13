import React,{useState,useEffect} from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [data, setdata] = useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
  const [confirmPass, setconfirmPass] = useState(true)
  const [buttDis,setButtDis]=useState(false)
  const handleChange=(e)=>{
   
    setdata({...data,[e.target.name]:e.target.value})
   
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
    <div className="Auth">
    {/* left side */}

    <div className="a-left">
      <img src={Logo} alt="" />

      <div className="Webname">
        <h1>ZKC Media</h1>
        <h6>Explore the ideas throughout the world</h6>
      </div>
    </div>

    {/* right form side */}

    <div className="a-right">
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
            onChange={handleChange}  
            value={data.username}         
          />
        </div>
        <div>
          <input
            required
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
          {isSignUp && (
            <input
              required
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={data.confirmpass}
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
            style={{
              background:buttDis&&"gray",
              cursor:buttDis && "none"
            }}
            disabled={buttDis}
          >
            {isSignUp ? "SignUp" : "Login"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};
export default Auth;