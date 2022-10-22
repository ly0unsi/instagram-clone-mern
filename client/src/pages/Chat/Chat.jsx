import React, { useContext, useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";

import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../Api/ChatApi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversation from "../../components/Conversation/Conversation";
import NavBar from "../../components/NavBar/Navbar";
import { SocketContext } from "../../Context/Context";
import Notifications from "../../components/Notification/Notification";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";
import { ToastContainer } from "react-toastify";
import { readMessages } from "../../Api/MessageApi";


const Chat = () => {
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const { callAccepted, callEnded, call, isMe, } = useContext(SocketContext);

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user._id]);

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("http://localhost:3001");

        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log("received");
            setReceivedMessage(data);
        }

        );

    }, []);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat?.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <div className="row h-[100vh] overflow-y-scroll ">
            {call.isReceivingCall && isMe === false && !callAccepted && (

                <Notifications />

            )}
            {callAccepted === true &&
                <VideoPlayer />
            }
            {/* Left Side */}
            {callAccepted === false && callEnded === false &&
                <div className="col-md-3">
                    {callAccepted === false && callEnded === false &&
                        <div style={{ width: "20rem" }} className="hidden lg:block">
                            <NavBar />
                        </div>
                    }
                    <div className="Chat-container dark:bg-zinc-800 dark:text-gray-50 transition duration-300 mt-4 ">
                        <h2 className="text-white  ">Chats</h2>
                        <div className="Chat-list max-h-[75vh] overflow-y-scroll">
                            {chats.map((chat, key) => (
                                <div key={key}
                                    onClick={() => {
                                        setCurrentChat(chat);
                                        readMessages(chat._id)
                                    }}
                                >
                                    <Conversation
                                        data={chat}
                                        receivedMessage={receivedMessage}
                                        currentUser={user._id}
                                        online={checkOnlineStatus(chat)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {/* Right Side */}

            <div className="col-md-9 middleSide lg:pl-[15px] ">

                {callAccepted === false && callEnded === false &&
                    <ChatBox
                        chat={currentChat}
                        currentUser={user._id}
                        online={checkOnlineStatus(currentChat)}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                    />
                }
            </div>
            <ToastContainer />
        </div>
    );
};

export default Chat;