import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';

import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../../Context/Context';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: 'auto',

        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },

    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
}));

export const VideoSidebar = ({ userId }) => {
    const { callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();

    return (

        <button style={{ borderRadius: '20px' }} onClick={() => callUser(userId)} className="button rounded-full p-2">
            <  Phone fontSize="small" />
        </button>

    );
};

