import React, { useContext, useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";

import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../Api/ChatApi";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import NavBar from "../../components/NavBar/Navbar";
import { ContextProvider, SocketContext } from "../../Context/Context";
import Notifications from "../../components/Notification/Notification";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";
import { CSSTransition } from "react-transition-group";

const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const { callAccepted, callEnded, call } = useContext(SocketContext);

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
        socket.current = io("ws://localhost:3001");
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
            console.log(data)
            setReceivedMessage(data);
        }

        );
    }, []);


    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <div className="row h-[100vh] overflow-y-scroll">
            {call.isReceivingCall && !callAccepted && (
                <CSSTransition
                    in={call.isReceivingCall}
                    timeout={300}
                    classNames={{
                        enter: 'animate__animated animate__slideInRight',
                        enterActive: 'animate__animated animate__slideInRight',
                        enterDone: 'animate__animated animate__slideInRight',
                        exit: 'animate__animated animate__slideOutRight',
                        exitActive: 'animate__animated animate__slideOutRightt',
                        exitDone: 'animate__animated animate__slideOutRight',
                    }}
                    unmountOnExit
                >
                    <Notifications />
                </CSSTransition>
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
                    <div className="Chat-container dark:bg-zinc-800 dark:text-gray-50 transition duration-300 mt-4 h-auto overflow-y-scroll">
                        <h2 className="text-white">Chats</h2>
                        <div className="Chat-list">
                            {chats.map((chat, key) => (
                                <div key={key}
                                    onClick={() => {
                                        setCurrentChat(chat);
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
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                    />
                }
            </div>
        </div>
    );
};

export default Chat;