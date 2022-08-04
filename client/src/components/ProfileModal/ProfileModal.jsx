import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {  Button  } from  'antd';
import { updateUser } from "../../Actions/UserAction";
import { uploadImage } from "../../Api/UplaodApi";
function ProfileModal({ modalOpened, setModalOpened}) {
  const theme = useMantineTheme();
  const dispatch =useDispatch()
  const {loading,error} =useSelector((state)=>state.authReducer)
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [catcherror, setcatcherror] = useState(null)
  const [formData, setformData] = useState(
    {
      currentUserId:user._id,
      username: user.username,
      firstname: user.firstname,
      lastname : user.lastname,
      profilePicture:  user.profilePicture,
      coverPicture:  user.coverPicture,
      livesin:  user.livesin,
      worksAt:  user.worksAt,
      relationship:  user.relationship
    })
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
   });
  const handleChange=(e)=>{
        if (e.target.files && e.target.files[0]){
            let img=e.target.files[0]
            console.log("hhhhhhhhh")
            setformData({...formData,[e.target.name]:img})
        }else{
        setformData({...formData,[e.target.name]:e.target.value})
        }
        
    }
  
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    let profilePicture=user.profilePicture
    let coverPicture=user.coverPicture
    if (formData.profilePicture.name) {
      console.log("fuck")
      profilePicture=await toBase64(formData.profilePicture)

    }
      if (formData.coverPicture.name){
        coverPicture=await toBase64(formData.coverPicture)
       
      }
      await  dispatch(updateUser(user._id,{...formData,coverPicture:coverPicture,profilePicture:profilePicture}))
      if(error){
        setcatcherror(true)
      }
      if (catcherror) {
        setModalOpened(true)
      }else{
        setModalOpened(false)
      }
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
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            value={formData.worksAt}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            value={formData.livesin}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name='relationship'
            value={formData.relationship}
            onChange={handleChange}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profilePicture'  onChange={handleChange}/>
            Cover Image
            <input type="file" name="coverPicture"   onChange={handleChange}/>
        </div>

        <Button  loading={loading} type="primary"  className='button fc-button' onClick={handleSubmit}>
         {loading ? "Updating" :"Update"}
        </Button>
      </form>
    </Modal>
  );
}

export default ProfileModal;