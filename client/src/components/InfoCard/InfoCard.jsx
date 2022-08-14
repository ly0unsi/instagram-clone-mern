import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { logout } from "../../Actions/AuthAction";
import { useNavigate } from "react-router-dom";
const InfoCard = ({profileUser}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch =useDispatch()
  const {user}=useSelector((state)=>state.authReducer.authData)
  const params=useParams()
  const navigate =useNavigate()
  const userLogout=()=>{
    dispatch(logout())
    
  }
  return (
    <div className="InfoCard mt-2">
      <div className="infoHead">
        <h4>Your Info</h4>
        {
          params.username===user.username &&
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
         
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              profileUser={profileUser}
            />
         </div>
        }
        
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser?.relationship ? profileUser.relationship:":Unkown"}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser?.livesin ? profileUser.livesin:":Unkown"}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser?.worksAt ? profileUser.worksAt:":Unkown"}</span>
      </div>

      {params.id===profileUser.username &&<button className="button logout-button" onClick={userLogout}>Logout</button>}
      {params.username===profileUser._id &&<button className="button logout-button" onClick={userLogout}>Logout</button>}


      {params.username===user.username &&<button className="button logout-button" onClick={userLogout}>Logout</button>}

    </div>
  );
};

export default InfoCard;