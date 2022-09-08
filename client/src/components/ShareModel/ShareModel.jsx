
import { Modal, useMantineTheme } from "@mantine/core";
import '../PostShare/PostShare.css'
import React, { useState } from 'react'
import Profile from '../../img/defaultProfile.png'
import { format } from "timeago.js";


import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sharePost } from "../../Actions/PostAction";


const ShareModal = ({ post, modalOpened, setModalOpened }) => {
    const loading = useSelector((state) => state.postReducer.uploading)
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)

    const [formdata, setformdata] = useState({
        postId: post?._id,
        postOwnerId: post.user?._id,
        userId: user._id,
        desc: post.desc,
        image: post.image,
        likes: post.likes,
        userDesc: "",
        _id: post._id

    })


    const onChange = (event) => {
        setformdata({ ...formdata, userDesc: event.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const hashtags = formdata.userDesc.match(/#\w+/g)
        await dispatch(sharePost({ ...formdata, hashtags }))
        setModalOpened(false)
    }



    return (
        <Modal
            overlayColor={
                theme.colors.dark[9]
            }
            overlayOpacity={0.55}
            overlayBlur={3}

            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <div className="PostShare col-sm-12 dark:bg-zinc-800 dark:text-gray-50 transition duration-300">
                <div className="w-[100%]">
                    <input onChange={onChange} name='desc' className='dark:bg-zinc-900' value={formdata.userDesc} type="text" placeholder="status" />
                    <div className="w-100  flex items-center ">
                        <div className='items-center'>
                            <img className='w-9 h-9 mr-2 object-cover rounded-full' src={post.user?.profilePicture ? post.user?.profilePicture : Profile} alt="" />
                        </div>
                        <div className="w-auto ml-1">
                            <span className='font-medium text-sm w-[100%]'>
                                {post.user?.username}
                            </span>
                            <span className='float-right text-xs w-[100%] dark:text-gray-400'>{format(post.createdAt)}</span>
                        </div>
                    </div>
                    <input disabled className='dark:bg-zinc-800' value={formdata.desc} type="text" placeholder="What's Popin ?" />

                    <div className="previewImage">
                        <img src={formdata.image} alt="" className='object-cover' name='image' />
                    </div>
                    <div className="postOptions">

                        <Button loading={loading} type="primary" className='button ps-button' onClick={handleSubmit}> Share</Button>

                    </div>

                </div>
            </div>
        </Modal>



    )
}

export default ShareModal