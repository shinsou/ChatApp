import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../models/Message";

const getTime = (date?: Date) => date ? date.getTime() : 0;
const getDateWithSliding = (days: number) => new Date(new Date().setDate(days));

const initialState: Array<Message> = [
    {
        id: '1',
        lobbyId: '1',
        senderId: '1',
        content: 'Awesome, got my fist message sent!',
        date: getDateWithSliding(-10)
    },
    {
        id: '2',
        lobbyId: '1',
        senderId: '1',
        content: 'Another! Lovely. :)',
        date: getDateWithSliding(-3)
    },
    {
        id: '3',
        lobbyId: '1',
        senderId: '1',
        content: 'Yay, one more...',
        date: getDateWithSliding(-2)
    },
    {
        id: '4',
        lobbyId: '1',
        senderId: '1',
        content: 'Oh, god... stil?!',
        date: getDateWithSliding(-1)
    },
    {
        id: '5',
        lobbyId: '1',
        senderId: '1',
        content: 'Please, make it stop!',
        date: new Date(new Date())
    },
].sort((first: Message, second: Message) => {
    return getTime(first.date) -  getTime(second.date);
});

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.push(action.payload);
        }
    }
});


export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;