import React,{useState,useRef} from 'react'
import profileImage from '../../img/profileImg.jpg'
import { CSSTransition } from 'react-transition-group';
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector } from 'react-redux';
const PostShare = () => {
    const [image,setImage]=useState(null)
    const [showImage, setshowImage] = useState(false)
    const {user}=useSelector((state)=>state.authReducer.authData)
    const imageRef=useRef()
    const desc =useRef()
    const onImageChange=(event)=>{
        if (event.target.files && event.target.files[0]){
            let img=event.target.files[0]
            setImage(img)
            setshowImage(true)
        }
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(image){
            const data =new FormData()
            const filename=Date.now() +image.name
            data.append("name",filename)
            data.append("file",image)
            newPost.image=filename
            console.log(newPost)
        }
    }
  return (
    <div className="PostShare">
        <img src={profileImage} alt="" />
        <div>
            <input  ref={desc} type="text" placeholder='What's hapening />
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
                <button className="button ps-button" onClick={handleSubmit}>Share</button>
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
                        }
                        } />
                            <img src={URL.createObjectURL(image)} alt="" />
                    </div>
            </CSSTransition> 

        </div>
    </div>
    
  )
}

export default PostShare