import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";
import { useDispatch, useSelector } from 'react-redux'
import Logo from "../../img/logo512.png";
import { login, signup } from "../../Actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [data, setdata] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  const [confirmPass, setconfirmPass] = useState(true)
  const [buttDis, setButtDis] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error)
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signup(data))
    } else {
      dispatch(login(data))
    }
  }

  const resetForm = () => {
    setdata({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  }
  useEffect(() => {
    if (data.password !== data.confirmpass && isSignUp) {
      setconfirmPass(false)
      setButtDis(true)
    } else {
      setconfirmPass(true)
      setButtDis(false)
    }

  }, [data.confirmpass, data.password, isSignUp])
  return (
    <div className="Auth row lg:px-44">
      {/* left side */}
      <ToastContainer />

      <div className="a-left col-lg-6 justify-center">
        <div className="Webname">

          <img className="w-[8.5rem] m-auto" src={Logo} alt="" />
          {/* <h1 className="dark:text-gray-50 mt-2 font-bold text-[25px]">Explore the ideas throughout the world</h1> */}
        </div>
      </div>

      {/* right form side */}

      <div className="a-right col-lg-6 justify-center col-sm-12">
        <form className="infoForm authForm dark:bg-zinc-800 dark:text-gray-50 transition duration-300" >
          <h3 className="text-[20px] dark:text-gray-200">{isSignUp ? "Register" : "Login"}</h3>
          <div className="justify-center">
            {isSignUp && (
              <div className="row">
                <div className="col-sm-12 col-lg-6 justify-center">
                  <input
                    required
                    type="text"
                    placeholder="First Name"
                    className="infoInput mt-2 dark:bg-zinc-900 "
                    name="firstname"
                    onChange={handleChange}
                    value={data.firstname}
                  />
                </div>
                <div className="col-sm-12 col-lg-6 justify-center">
                  <input
                    required
                    type="text"
                    placeholder="Last Name"
                    className="infoInput mt-2 dark:bg-zinc-900"
                    name="lastname"
                    onChange={handleChange}
                    value={data.lastname}
                  />
                </div>
              </div>
            )}

            <div className="col-md-6 m-auto">
              <input
                required
                type="text"
                placeholder="Username"
                className="infoInput mt-2 dark:bg-zinc-900 pl-4 w-[100%]"
                name="username"

                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-6 justify-center">
                <input
                  required
                  type="password"
                  className="infoInput mt-2 dark:bg-zinc-900 w-[100%]"
                  placeholder="Password"
                  name="password"

                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              {isSignUp && (
                <div className="col-md-12 col-lg-6 justify-center">
                  <input
                    required
                    type="password"
                    className="infoInput mt-2 dark:bg-zinc-900"
                    name="confirmpass"
                    placeholder="Confirm Password"

                    value={data.confirmpass}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
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
                display: "block"
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

              disabled={isSignUp ? buttDis : loading}
              onClick={handleSubmit}
            >
              {loading ? "Loding" : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Auth;