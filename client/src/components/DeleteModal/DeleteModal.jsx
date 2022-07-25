import React from 'react'
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../Actions/PostAction';
const DeleteModal = ({ modalOpened, setModalOpened,postId,postOwnerId}) => {
  const theme = useMantineTheme();
  const {user} =useSelector((state)=>state.authReducer.authData)
  const dispatch =useDispatch()
  const handledelete=async(e)=>{
    e.preventDefault()
    await dispatch(deletePost(postId,user._id))
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
    size="30%"
    opened={modalOpened}
    onClose={() => setModalOpened(false)}
  >
    <h1 className='text-size text-xl'>Are you sure u wanna delete ?</h1>
    <div className='flex gap-2 mt-1'>
      <button className='p-1.5 px-3 bg-red-500 rounded text-white' onClick={handledelete}>Delete</button>
      <button className='p-1.5 px-3 bg-blue-500 rounded text-white' onClick={()=>setModalOpened(false)}>Cancel</button>
    </div>
    </Modal>
  )
}

export default DeleteModal