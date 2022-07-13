import React,{useState} from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

const Auth = () => {
  const [issignup, setIsSignup] = useState(false)
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {issignup?<SignUp issignup={issignup} setIsSignup={setIsSignup}/>:<LogIn/>}
    </div>
  );
};
function LogIn({issignup, setIsSignup}) {
    return (
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>Log In</h3>
  
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
            />
          </div>
  
          <div>
              <span style={{ fontSize: "12px" }}>
                Don't have an account? 
              </span>
              <span onClick={()=>setIsSignup((prev)=>!prev)}>
                Sign up
              </span>
            <button className="button infoButton">Login</button>
          </div>
        </form>
      </div>
    );
  }
function SignUp({issignup, setIsSignup}) {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Sign up</h3>

        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
          />
        </div>

        <div>
            <span style={{fontSize: '12px'}}>Already have an account.</span>
            <span onClick={()=>setIsSignup((prev)=>!prev)}> Login!</span>
        </div>
        <button className="button infoButton" type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Auth;