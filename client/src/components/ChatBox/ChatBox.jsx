import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../Api/MessageApi";
import Profile from '../../img/defaultProfile.png'
import { SendOutlined } from '@ant-design/icons';
import { getUserById } from "../../Api/UserApi";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { UilScenery } from "@iconscout/react-unicons";
import { VideoSidebar } from "../VideoSideBar/VideoSideBar";
import { UilTimes } from "@iconscout/react-unicons";
import { SocketContext } from "../../Context/Context";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, online }) => {
    const [userData, setUserData] = useState(null);
    const { user } = useSelector((state) => state.authReducer.authData)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const imageRef = useRef()
    const [image, setImage] = useState(null)
    const [showImage, setshowImage] = useState(false)
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const { callAccepted, callEnded, setName } = useContext(SocketContext);
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const onImageChange = (event) => {
        console.log("changed")
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setImage(img)

            setshowImage(true)
        }
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
    const sendNotification = (message, user) => {
        const notification = new Notification("New message from Open Chat", {
            icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
            body: `@${user}: ${message}`
        })
        notification.onclick = () => function () {
            window.open("http://localhost:3000/chat")
        }
    }
    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()


        const receiverId = chat.members.find((id) => id !== currentUser);

        const message = {
            senderId: currentUser,
            senderName: user.username,
            text: newMessage,
            chatId: chat._id,
            seen: false,
            receiverId
        }
        // send message to socket server

        if (image) {
            const file = await toBase64(image)
            message.image = file
        }
        setSendMessage(message)
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
        if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const scroll = useRef();
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
                                                : Profile
                                        }
                                        alt="Profile"
                                        className="followerImage object-cover"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>
                                            {userData?.firstname} {userData?.lastname}
                                        </span>
                                    </div>
                                </div>

                                <div className="ml-auto order-2">
                                    {online &&
                                        <VideoSidebar userId={userData?._id} />
                                    }




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
                            <CSSTransition
                                in={showImage}
                                timeout={400}
                                classNames="alert"
                                unmountOnExit

                            >
                                <div className="previewImage w-[50%] ml-[10%]">
                                    <UilTimes onClick={() => {
                                        setshowImage(false)
                                        setImage(null)
                                        imageRef.current.value = null
                                    }
                                    } />
                                    <img src={image && URL.createObjectURL(image)} alt="" className='object-cover' />
                                </div>
                            </CSSTransition>
                            <div className="chat-sender relative bg-transparent dark:text-white">
                                <div className="hidden" onClick={() => imageRef.current.click()}>+</div>
                                <InputEmoji
                                    value={newMessage}
                                    onChange={handleChange}
                                    theme="dark"
                                />
                                <div className="p-4  dark:text-zinc-500 z-10 absolute right-6 text-xl bottom-6" onClick={handleSend}><SendOutlined /></div>
                                <div className="p-4 right-[3.5rem] dark:text-zinc-500 z-10 absolute top-[-1px] text-xl bottom-6"
                                    onClick={() => imageRef.current.click()}
                                >
                                    <UilScenery />
                                </div>
                                <div style={{ display: "none" }}>
                                    <input
                                        type="file"
                                        name="myImage"
                                        ref={imageRef}
                                        onChange={onImageChange}

                                    />
                                </div>
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