import React,{useState,useRef} from 'react'
import profileImage from '../../img/defaultProfile.png'
import { CSSTransition } from 'react-transition-group';
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../Api/UplaodApi';
import { uploadPost } from '../../Actions/uploadAction';
const storageLink =process.env.REACT_APP_STORAGE_URL
const PostShare = () => {
    const [image,setImage]=useState(null)
    const [showImage, setshowImage] = useState(false)
    const {user}=useSelector((state)=>state.authReducer.authData)
    const loading=useSelector((state)=>state.postReducer.uploading)
    const error=useSelector((state)=>state.postReducer.error)
    const imageRef=useRef()
    const desc =useRef()
    const dispatch =useDispatch()
    const onImageChange=(event)=>{
       console.log("changed") 
        if (event.target.files && event.target.files[0]){
            let img=event.target.files[0]
        
            setImage(img)
            setshowImage(true)
        }
    }
    const resetForm =()=>{
        setImage(null)
        setshowImage(false)
        desc.current.value=""
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
     
        const newPost={
            userId:user._id,
            desc:desc.current.value,
            user:{profilePicture:user.profilePicture,firstname:user.firstname,lastname:user.lastname,_id:user._id,username:user.username}
        }
        if(image){
            const data =new FormData()
            const filename=Date.now() +image.name
            data.append("name",filename)
            data.append("file",image)
            newPost.image=filename
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        if(!error){
            resetForm()
        }
    }
  return (
    <div className="PostShare">
        <img src={user.profilePicture ? storageLink + user.profilePicture: profileImage} alt="" />
        <div>
            <input  ref={desc} type="text" placeholder="What's Popin ?" />
            <div className="postOptions">
                <div className="option" style={{ color: "var(--photo)" }} 
                    onClick={()=>imageRef.current.click()}
                >
                    <UilScenery />
                    Photo
                </div>
                <div className="option" style={{ color: "var(--video)" }}>
                    <UilPlayCircle />
                    Video
                </div>
                <div className="option" style={{ color: "var(--location)" }}>
                    <UilLocationPoint />
                    Location
                </div>
                <div className="option" style={{ color: "var(--shedule)" }}>
                    <UilSchedule />
                    Shedule
                </div>
                <button  disabled={loading ? true :false} className="button ps-button" onClick={handleSubmit}>{loading ? "uploading":"Share"}</button>
                <div style={{ display: "none" }}>
                    <input
                    type="file"
                    name="myImage"
                    ref={imageRef}
                    onChange={onImageChange}
                   
                    />
                </div>
            </div>
          
            <CSSTransition
                in={showImage}
                timeout={400}
                classNames="alert"
                unmountOnExit
                
            >
                    <div className="previewImage">    
                        <UilTimes onClick={()=>{setshowImage(false)
                            setImage(null)
                            imageRef.current.value=null
                        }
                        } />
                            <img src={image && URL.createObjectURL(image)} alt="" />
                    </div>
            </CSSTransition> 

        </div>
    </div>
    
  )
}

export default PostShare