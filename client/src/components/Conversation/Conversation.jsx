import { message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "../../Api/UserApi";
const Conversation = ({ data, currentUser, online, receivedMessage }) => {
    const [message, setmessage] = useState(data.message?.text)

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
    useEffect(() => {
        receivedMessage !== null && receivedMessage?.chatId === data?._id && setmessage(receivedMessage)
    }, [receivedMessage])

    return (
        <>
            <div className="follower conversation">
                <div>
                    {online && <div className="online-dot"></div>}
                    <img
                        src={userData?.profilePicture ? userData.profilePicture : process.env.REACT_APP_STORAGE_URL + "defaultProfile.png"}
                        alt="Profile"
                        className="followerImage"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>{userData?.username} </span>
                        <span>
                            {data.message && (data.message?.senderid === userData?._id ? userData?.username : "You") + ": " + message}
                        </span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    );
};

export default Conversation;