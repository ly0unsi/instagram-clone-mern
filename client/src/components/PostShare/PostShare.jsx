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
import { uploadPost } from '../../Actions/uploadAction';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

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
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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
        imageRef.current.value=null
    }


    const handleSubmit =async (e)=>{
        e.preventDefault()
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(image){
            const file=await toBase64(image)  
            newPost.image=file
        }
        await dispatch(uploadPost(newPost))
        if(!error){
            resetForm()
        }
    }


  return (
    <div className="PostShare dark:bg-zinc-800 dark:text-gray-50 transition duration-300">
        <Link to={`/profile/${user.username}`} className="w-12 h-12"  style={{ textDecoration: "none", color: "inherit" }}>
            <img src={user.profilePicture ? user.profilePicture: profileImage} alt="" className='object-cover rounded-full w-12 h-12' />
        </Link>
        <div>
            <input  ref={desc} type="text" className='dark:bg-zinc-900' placeholder="What's Popin ?" />
            <div className="postOptions">
                <div className="option" style={{ color: "var(--photo)" }} 
                    onClick={()=>imageRef.current.click()}
                >
                    <UilScenery />
                    Photo
                </div>
                <div className="option hidden lg:block" style={{ color: "var(--video)" }}>
                    <UilPlayCircle />
                    Video
                </div>
                <div className="option" style={{ color: "var(--location)" }}>
                    <UilLocationPoint />
                    Location
                </div>
                <div className="option hidden lg:block" style={{ color: "var(--shedule)" }}>
                    <UilSchedule />
                    Shedule
                </div>
                <Button  loading={loading} className='button ps-button' onClick={handleSubmit}> {loading ? "uploading":"Share"}</Button>
               
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
                        <UilTimes onClick={()=>{
                            setshowImage(false)
                            setImage(null)
                            imageRef.current.value=null
                        }
                        } />
                            <img src={image && URL.createObjectURL(image)} alt="" className='object-cover'  />
                    </div>
            </CSSTransition> 

        </div>
    </div>
    
  )
}

export default PostShare