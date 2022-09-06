import { message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import Profile from '../../img/defaultProfile.png'
import { useDispatch } from "react-redux";
import { getUserById } from "../../Api/UserApi";
const Conversation = ({ data, currentUser, online, receivedMessage }) => {
    const [message, setmessage] = useState(data.message?.text)
    const [unreadCount, setunreadCount] = useState(data.msgCount)
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser)
        // console.log(userId);
        const getUserData = async () => {
            try {
                const { data } = await getUserById(userId)
                setUserData(data)
                dispatch({ type: "SAVE_USER", data: data })
            }
            catch (error) {
                console.log(error)
            }
        }
        getUserData();
        console.log(data);
    }, [])
    console.log(userData);
    useEffect(() => {
        receivedMessage !== null && receivedMessage?.chatId === data?._id && setmessage(receivedMessage.text)
    }, [receivedMessage])

    return (
        <>
            <div className="conversation dark:bg-zinc-900 bg-slate-100">
                <div className="flex items-center">
                    <div className="flex items-center gap-2 relative">
                        {online && <div className="online-dot"></div>}
                        <img
                            src={userData?.profilePicture ? userData.profilePicture : Profile}
                            alt="Profile"
                            className="followerImage object-cover"
                            style={{ width: "50px", height: "50px" }}
                        />
                        <div className="name" style={{ fontSize: '0.8rem' }}>
                            <span>{userData?.username} </span>
                            <span className="text-slate-400 ">
                                {data.message && (data.message?.senderId === userData?._id ? "" : "You: ") + (message.length > 20 ? message.substring(0, 20) + "..." : message)}
                            </span>
                        </div>
                    </div>
                    {data.msgCount > 0 &&
                        <span className="ml-auto order-2 comment-count dark:bg-white dark:text-zinc-900">
                            {unreadCount}
                        </span>
                    }
                </div>
            </div>

        </>
    );
};

export default Conversation;