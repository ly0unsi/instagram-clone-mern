import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../../Context/Context';



export const Notifications = () => {
    const { answerCall, call, decline } = useContext(SocketContext);

    return (
        <>

            <div className="fixed float top-5 right-5 p-4 rounded-lg  border-blue-500 bg-slate-100 w-[300px] z-index-10 text-zinc-800 dark:bg-zinc-700 dark:text-slate-50 flex align-center gap-5" >
                <h1 className='text-white'>{call.name} is calling:</h1>
                <button className='button px-2 z-1' onClick={answerCall}>
                    Answer
                </button>
                <button className='rounded-lg bg-red-500 px-2 z-1' onClick={decline}>
                    Decline
                </button>
            </div>

        </>
    );
};

export default Notifications;