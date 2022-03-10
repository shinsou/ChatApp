import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    List,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
    Toolbar,
    Box,
    Paper,
    IconButton,
    TextField,
    Button
} from "@mui/material";
import DirectionsIcon from '@mui/icons-material/Directions';
import { Message } from "../models/Message";
import { addMessage } from '../store/messageReducer';
import { getMemberById } from "../store/memberReducer";
import { RootState, useAppDispatch } from "../store/configureStore";

export function MessageList() {
    const dispatch = useAppDispatch();
    const messageEndRef = useRef<null | HTMLDivElement>(null);
    const messages = useSelector((state: RootState) => state.messages);
    const [ messageText, setMessageText ] = useState("");

    const sendMessage = (messageText: string) => {
        dispatch(getMemberById('1'))
            .unwrap()
            .then(memberName => {
                const message: Message = {
                    id: `${messages.length+1}`,
                    date: new Date(),
                    content: messageText || "",
                    lobbyId: '1',
                    senderId: '1',
                    resolvedSenderName: memberName
                };
        
                dispatch(addMessage(message));
                setMessageText('');
            })
    }

    const onClickSendMessage = (e) => {
        sendMessage(messageText);
    }

    const adorment = (index) => {
        return (
            <>
                <Button variant="text" sx={{ opacity: 0.5 }}>
                    {`All`}
                </Button>
                <Divider sx={{ height: 28, m: 0.3 }} orientation="vertical" />
            </>
        );
    }

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <Box
            component="main"
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%'
            }}
        >
            <Toolbar />
            <List 
                sx={{
                    bgcolor: 'background.paper',
                    marginTop: 'auto',
                    overflowY: 'hidden',
                    hover: 'overflow-scroll'
                }}
            >
                {messages.map((message, i)=> {
                    return (
                        <div key={`message-id-${message.id}`}>
                            <ListItemButton ref={messageEndRef}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                             <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {message.resolvedSenderName || 'System'}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                color="text.disabled"
                                            >
                                                {` — ${message.date.toLocaleString()} `}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {message.content}    
                                            </Typography>
                                            
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                            {i < messages.length-1 && <Divider variant="inset" component="li" />}
                        </div>
                    );
                })}
            </List>
            <Paper
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                 }}
            >
                {adorment()}
                <TextField
                    value={messageText}
                    fullWidth 
                    sx={{ m: 1 }}
                    variant="standard"
                    placeholder={`Send message...`}
                    InputProps={{
                        'aria-label': 'Send message'
                    }}
                    onChange={(e)=> {
                        setMessageText(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        e.code == "Enter" && !e.shiftKey && messageText?.length > 0 && sendMessage(messageText);
                    }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    color="primary"
                    sx={{ p: '10px' }}
                    aria-label="directions"
                    onClick={onClickSendMessage}
                >
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}