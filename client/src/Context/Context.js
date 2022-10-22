import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SocketContext = createContext();

const socket = io('http://localhost:3001');


const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [callDeclined, setCallDeclined] = useState(false);
    const [stream, setStream] = useState();
    const [isMe, setIsMe] = useState(false)
    const { user } = useSelector((state) => state.authReducer.authData)
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const decline = () => {

        setCall({ isReceivingCall: false })
        socket.emit("callDeclined", user.id)
    }

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });
        socket.on('me', (id) => setMe(id));

        socket.on('userCall', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
            if (callerName === user.username) setIsMe(true); else setIsMe(false);
        });
        socket.on('leaveCall', () => {
            setCallEnded(true);
            connectionRef.current.destroy();

            window.location.reload();
        })
        socket.on('callDeclined', () => {
            setCallDeclined((prev) => !prev)
            setCall({ isReceivingCall: false })

        })
    }, [callAccepted,]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: user.username });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        socket.emit('leaveCall')
        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            decline,
            callEnded,
            isMe,
            callDeclined,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };