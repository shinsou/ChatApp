import DirectionsIcon from '@mui/icons-material/Directions';
import PersonIcon from '@mui/icons-material/Person';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    IconButton,
    List as MuiList,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AutoSizer, InfiniteLoader } from "react-virtualized";
import "react-virtualized/styles.css";
import { FixedSizeList as List } from "react-window";
import { Message } from "../models/Message";
import { RootState, useAppDispatch } from "../store/configureStore";
import { getMemberById } from "../store/memberReducer";
import { addMessage } from '../store/messageReducer';

const Messages = () => {
    const messageEndRef = useRef<null | HTMLDivElement>(null);
    const messages = useSelector((state: RootState) => state.messages);
    
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    return (
        <MuiList 
            sx={{
                bgcolor: 'background.paper',
                marginTop: 'auto',
                overflowY: 'hidden',
                hover: 'overflow-scroll'
            }}
        >
            {messages.map((message, i)=> {
                return (
                    <li key={`message-id-${message.id}`}>
                        <ListItemButton>
                            <ListItemAvatar>
                                {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
                                <PersonIcon /> 
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
                        {i < messages.length-1 && <Divider variant="inset" component="div" />}
                    </li>
                );
            })}
            <div ref={messageEndRef} />
        </MuiList>
    );
}

const MessageContainer = (props) => {
    const { index, data, style } = props;

    return (
        <ListItem key={`message-id-${data[index].id}`} component="div" sx={{ paddingLeft: 0, paddingRight: 0 }} style={style}>
            <ListItemButton>
                <ListItemAvatar>
                    {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
                    <PersonIcon /> 
                </ListItemAvatar>
                <ListItemText
                primary={
                    <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                        {data[index].id || "System"}
                    </Typography>
                    <Typography
                        component="span"
                        variant="caption"
                        color="text.disabled"
                    >
                        {` — ${data[index].date?.toLocaleString()} `}
                    </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                    >
                        {data[index].content}
                    </Typography>
                    </React.Fragment>
                }
                />
            </ListItemButton>
        </ListItem>
    );
};

const VirtualMessages = () => {
    const messages = useSelector((state: RootState) => state.messages);

    const loadMoreRows = ({startIndex, stopIndex}) => new Promise((resolve) => {});

    const isRowLoaded = ({index}) => !!messages[index];

    return (
        <div style={{ flex: '1 1 auto' }}>
            <AutoSizer disableWidth>
            {({ height, width }) => (
                <InfiniteLoader
                    itemCount={messages.length}
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                >
                {({ onItemsRendered, ref }) => (
                    <List
                        height={height}
                        width={'100%'}
                        itemCount={messages.length}
                        itemSize={64}
                        itemData={messages}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {MessageContainer}
                    </List>
                )}
                </InfiniteLoader>
            )}
            </AutoSizer>
        </div>
    );
}

const MessageForm = () => {
    const dispatch = useAppDispatch();
    const [ messageText, setMessageText ] = useState("");

    const onMessageTextChanged = (e) => {
        setMessageText(e.target.value);
    }

    const onClickSendMessage = (e) => {
        dispatch(getMemberById('1'))
            .unwrap()
            .then(memberName => {
                const message: Message = {
                    id: `${nanoid()}`,
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

    const adorment = () => {
        return (
            <>
                <Button variant="text" sx={{ opacity: 0.5 }}>
                    {`All`}
                </Button>
                <Divider sx={{ height: 28, m: 0.3 }} orientation="vertical" />
            </>
        );
    }

    return (
        <FormControl
            fullWidth
            onSubmit={(e) => e.preventDefault()}
            sx={{
                p: 1,
                display: "flex",
                alignItems: "center"
            }}
        >
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
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
                    onChange={onMessageTextChanged}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    color="primary"
                    sx={{ p: '10px' }}
                    aria-label="directions"
                    onClick={onClickSendMessage}
                    type="submit"
                >
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        </FormControl>
    );
}

export function MessageList() {
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%'
            }}
        >
            <Toolbar />
            <VirtualMessages />
            <MessageForm />
        </Box>
    );
}