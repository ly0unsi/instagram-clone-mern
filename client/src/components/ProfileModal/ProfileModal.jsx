import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'antd';
import { updateUser } from "../../Actions/UserAction";
import { uploadImage } from "../../Api/UplaodApi";
import useDarkMode from "../../Utils/UseDark";
function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.authReducer)
  const { user } = useSelector((state) => state.authReducer.authData)
  const [colorTheme, settheme] = useDarkMode()
  const [catcherror, setcatcherror] = useState(null)
  let [formData, setformData] = useState(
    {
      currentUserId: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      livesin: user.livesin,
      worksAt: user.worksAt,
      relationship: user.relationship
    })
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]

      setformData({ ...formData, [e.target.name]: img })
    } else {
      setformData({ ...formData, [e.target.name]: e.target.value })
    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    let profilePicture
    let coverPicture
    if (formData.profilePicture?.name) {

      profilePicture = await toBase64(formData.profilePicture)
      formData = { ...formData, profilePicture: profilePicture }
      console.log(profilePicture);
    }
    if (formData.coverPicture?.name) {
      coverPicture = await toBase64(formData.coverPicture)
      formData = { ...formData, coverPicture: coverPicture }

    }
    await dispatch(updateUser(user._id, formData))
    if (error) {
      setcatcherror(true)
    }
    if (catcherror) {
      setModalOpened(true)
    } else {
      setModalOpened(false)
    }
  }
  return (
    <Modal
      overlayColor={
        colorTheme !== "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}


      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="p-4 infoForm dark:bg-zinc-800 bg-slate-50 dark:text-white  rounded-lg">
        <h3 className="dark:text-white">Your info</h3>


        <div className="row gap-1 mt-2">
          <input
            type="text"
            className="infoInput pl-2 dark:bg-zinc-900"
            name="firstname"
            placeholder="First Name"

            onChange={handleChange}
            value={formData.firstname}
          />


          <input
            type="text"
            className="infoInput pl-2 dark:bg-zinc-900"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />

        </div>

        <div className="row gap-1 mt-2">
          <input
            type="text"
            className="infoInput pl-2 dark:bg-zinc-900"
            name="worksAt"
            placeholder="Works at"
            value={formData.worksAt}
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput pl-2 dark:bg-zinc-900"
            name="livesin"
            placeholder="LIves in"
            value={formData.livesin}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          className="infoInput pl-2 mt-2 dark:bg-zinc-900 w-[100%]"
          placeholder="RelationShip Status"
          name='relationship'
          value={formData.relationship}
          onChange={handleChange}
        />
        <div className="row m-auto text-[14px] mt-2">
          <div className="col-md-6">
            <label htmlFor="">
              Profile Image
            </label>
            <input type="file" name='profilePicture' onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="">
              Cover Image
            </label>

            <input type="file" name="coverPicture" onChange={handleChange} />
          </div>
        </div>



        <Button loading={loading} type="primary" className='button fc-button mt-2' onClick={handleSubmit}>
          {loading ? "Updating" : "Update"}
        </Button>
      </form>
    </Modal>
  );
}

export default ProfileModal;