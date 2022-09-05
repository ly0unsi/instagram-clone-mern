import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../Api/MessageApi";
import { getUserById } from "../../Api/UserApi";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { VideoSidebar } from "../VideoSideBar/VideoSideBar";
import Notifications from "../Notification/Notification";
import { ContextProvider, SocketContext } from "../../Context/Context";
import { useSelector } from "react-redux";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const { user } = useSelector((state) => state.authReducer.authData)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { callAccepted, callEnded, setName } = useContext(SocketContext);
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }


    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUserById(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);


    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    useEffect(() => {
        setName(user.userName)
    }, [])


    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id) => id !== currentUser);
        // send message to socket server
        setSendMessage({ ...message, receiverId })
        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch
        {
            console.log("error")
        }
    }

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])



    const scroll = useRef();
    const imageRef = useRef();
    return (
        <>
            <div className="ChatBox-container dark:bg-zinc-800 dark:text-gray-50 transition duration-300 mt-2 h-[90vh] overflow-y-scroll">
                {chat ?
                    (
                        <>
                            {/* chat-header */}
                            <div className="flex align-center  items-center p-3" >


                                <div className="flex align-center gap-3">
                                    <img
                                        src={
                                            userData?.profilePicture
                                                ?
                                                userData.profilePicture
                                                : process.env.REACT_APP_STORAGE_URL +
                                                "defaultProfile.png"
                                        }
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>
                                            {userData?.firstname} {userData?.lastname}
                                        </span>
                                    </div>
                                </div>

                                <div className="ml-auto order-2">

                                    <VideoSidebar userId={userData?._id} />

                                </div>





                            </div>
                            {/* chat-body */}

                            {callAccepted === false && callEnded === false &&
                                <div className="chat-body" >

                                    {messages.map((message, key) => (
                                        <>
                                            <div ref={scroll}
                                                className={
                                                    message.senderId === currentUser
                                                        ? "message own"
                                                        : "message"
                                                }
                                            >
                                                <span>{message.text}</span>{" "}
                                                <span>{format(message.createdAt)}</span>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            }
                            {/* chat-sender */}
                            <div className="chat-sender dark:bg-zinc-900 dark:text-white">
                                <div className="hidden" onClick={() => imageRef.current.click()}>+</div>
                                <InputEmoji
                                    value={newMessage}
                                    onChange={handleChange}
                                    theme="dark"
                                />
                                <div className="send-button button dark:bg-zinc-900 dark:text-white" onClick={handleSend}>Send</div>

                            </div>{" "}

                        </>
                    ) : (
                        <span className="chatbox-empty-message">
                            Tap on a chat to start conversation...
                        </span>
                    )}

            </div>
        </>
    );
};

export default ChatBox;