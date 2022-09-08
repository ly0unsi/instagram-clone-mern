
import { Modal, useMantineTheme } from "@mantine/core";
import '../PostShare/PostShare.css'
import React, { useState, useRef } from 'react'

import { UilScenery } from "@iconscout/react-unicons";

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from "../../Actions/PostAction";

const ShareModal = ({ post, modalOpened, setModalOpened }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const loading = useSelector((state) => state.postReducer.uploading)
    const imageRef = useRef()
    const [formdata, setformdata] = useState({
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
        await dispatch(updatePost(post?._id, formdata))
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
                    <input onChange={onChange} name='desc' className='dark:bg-zinc-900' value={formdata.userDesc} type="text" placeholder="What's Popin ?" />
                    <input disabled className='dark:bg-zinc-900' value={formdata.desc} type="text" placeholder="What's Popin ?" />
                    <div className="postOptions">
                        <div className="option" style={{ color: "var(--photo)" }}
                            onClick={() => imageRef.current.click()}
                        >
                            <UilScenery />

                        </div>
                        <Button loading={loading} type="primary" className='button ps-button' onClick={handleSubmit}> {loading ? "Updating" : "Update"}</Button>

                        <div style={{ display: "none" }}>
                            <input
                                type="file"
                                name="myImage"
                                ref={imageRef}
                                onChange={onChange}

                            />
                        </div>
                    </div>


                    <div className="previewImage">

                        <img src={formdata.image} alt="" className='object-cover' name='image' />
                    </div>


                </div>
            </div>
        </Modal>



    )
}

export default ShareModal