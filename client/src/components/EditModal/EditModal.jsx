
import { Modal, useMantineTheme } from "@mantine/core";
import '../PostShare/PostShare.css'
import React,{useState,useRef} from 'react'
import { CSSTransition } from 'react-transition-group';
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { Button } from 'antd/lib/radio';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from "../../Actions/PostAction";
import { uploadImage } from "../../Api/UplaodApi";
const EditModal = ({post,modalOpened,setModalOpened}) => {
    const theme = useMantineTheme();
    const [image,setImage]=useState(post.image)
    const [showImage, setshowImage] = useState(true)
    const dispatch =useDispatch()
    const {user}=useSelector((state)=>state.authReducer.authData)
    const loading=useSelector((state)=>state.postReducer.uploading)
    const error=useSelector((state)=>state.postReducer.error)
    const imageRef=useRef()
    const [formdata, setformdata] = useState({
        userId:user._id,
        desc:post.desc,
        image:post.image,
        likes:post.likes,
        _id:post._id

    })

    const onChange=(event)=>{
         
         if (event.target.files && event.target.files[0]){
             let img=event.target.files[0]
             setformdata({...formdata,image:img})
             setshowImage(true)
         }else{
            setformdata({...formdata,desc:event.target.value})
         }

     }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        let postImage=post.image;
        if(formdata.image.name){
            console.log("voila")
            const data =new FormData()
            const filename=Date.now() +formdata.image.name
            data.append("name",filename)
            data.append("file",formdata.image)
            postImage=filename
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        await dispatch(updatePost(post?._id,{...formdata,image:postImage}))
        setModalOpened(false)
        
    }
  
  return (
    <Modal
    overlayColor={
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2]
    }
    overlayOpacity={0.55}
    overlayBlur={3}
    size="50%"
    opened={modalOpened}
    onClose={() => setModalOpened(false)}
  >
    <div className="PostShare">
        <div className="w-[100%]">
            <input onChange={onChange} name='desc' value={formdata.desc} type="text" placeholder="What's Popin ?" />
            <div className="postOptions">
                <div className="option" style={{ color: "var(--photo)" }} 
                    onClick={()=>imageRef.current.click()}
                >
                    <UilScenery />
                    
                </div>
                <Button  loading={loading} className='button ps-button' onClick={handleSubmit}> {loading ? "Editing":"Edit"}</Button>
               
                <div style={{ display: "none" }}>
                    <input
                    type="file"
                    name="myImage"
                    ref={imageRef}
                    onChange={onChange}
                   
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
                            <img src={formdata.image?.name ? URL.createObjectURL(formdata.image):process.env.REACT_APP_STORAGE_URL+ formdata.image} alt="" className='object-cover' name='image'  />
                    </div>
            </CSSTransition> 

        </div>
    </div>
    </Modal>
  )
}

export default EditModal