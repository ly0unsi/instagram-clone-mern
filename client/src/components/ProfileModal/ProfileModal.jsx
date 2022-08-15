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
      
      className="w-[95%] lg:w-2/3 m-auto dark:bg-zinc-800 dark:text-gray-50 transition duration-300"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="p-2 infoForm">
        <h3>Your info</h3>

        
         <div className="row mt-2">
            <input
              type="text"
              className="infoInput pl-2"
              name="firstname"
              placeholder="First Name"
            
              onChange={handleChange}
              value={formData.firstname}
            />
        
       
          <input
            type="text"
            className="infoInput pl-2"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
        
        </div>

          
    

     <div className="row mt-2">
      <input
              type="text"
              className="infoInput pl-2"
              name="worksAt"
              placeholder="Works at"
              value={formData.worksAt}
              onChange={handleChange}
            />
        

        
            <input
              type="text"
              className="infoInput pl-2"
              name="livesin"
              placeholder="LIves in"
              value={formData.livesin}
              onChange={handleChange}
            />
     </div>
         
       

    
        <input
          type="text"
          className="infoInput pl-2 mt-2"
          placeholder="RelationShip Status"
          name='relationship'
          value={formData.relationship}
          onChange={handleChange}
        />
        <div className="row m-auto">
          <label htmlFor="">
          Profile Image 
          </label>
        </div>
        <input type="file" name='profilePicture'  onChange={handleChange}/>
        <div className="row">
            <label htmlFor="">
              Cover Image
            </label>
        </div>
        <input type="file" name="coverPicture"   onChange={handleChange}/>
        <Button  loading={loading} type="primary"  className='button fc-button ' onClick={handleSubmit}>
            {loading ? "Updating" :"Update"}
        </Button>
    </form>
    </Modal>
  );
}

export default ProfileModal;