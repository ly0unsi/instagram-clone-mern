import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { SocketContext } from '../../Context/Context';
import { PhoneDisabled } from '@material-ui/icons'; import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    video: {
        width: '100%',

        objectFit: 'fill',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: "83vh",
            objectFit: "cover"
        },
    },
    callerVideo: {
        width: '230px',
        position: 'absolute',
        bottom: '9%',
        right: '18px',
        [theme.breakpoints.down('xs')]: {
            width: '115px',
            height: "115px",
            objectFit: "cover",
            borderRadius: '50%'
        },
    },
    gridContainer: {
        justifyContent: 'center',
        width: "56%",
        margin: "auto",
        position: "relative",
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            width: '100%'
        },
    },
    paper: {

        padding: '5px',
        border: '2px solid black',
        margin: '10px',
    },
}));

export const VideoPlayer = () => {
    const { callAccepted, userVideo, callEnded, stream, myVideo, leaveCall } = useContext(SocketContext);
    const classes = useStyles();

    return (
        <Grid className={classes.gridContainer}>

            {callAccepted && !callEnded && (
                <>
                    <Paper className={classes.paper}>


                        <video playsInline ref={userVideo} autoPlay className={classes.video} />


                    </Paper>
                    <Button color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                        Hang Up
                    </Button>
                </>

            )}
            {stream && callAccepted && !callEnded ?



                <video playsInline ref={myVideo} autoPlay className={classes.callerVideo} />



                : ""
            }
        </Grid>
    );
};