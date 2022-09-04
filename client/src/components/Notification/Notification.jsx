import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../../Context/Context';



export const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>

            <div className="absolute top-10 right-5 p-4 rounded-lg  border-blue-500 bg-slate-100 w-[200px] z-index-10 text-zinc-800 dark:bg-zinc-700 dark:text-slate-50 flex align-center gap-5" >
                <h1>{call.name} is calling:</h1>
                <button className='button p-2 z-1' onClick={answerCall}>
                    Answer
                </button>
            </div>

        </>
    );
};

export default Notifications;