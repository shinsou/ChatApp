import { createSlice } from "@reduxjs/toolkit";
import { Lobby } from "../models/Lobby";

const initialState: Array<Lobby> = [
    {
        id: '1',
        name: 'first',
    },
    {
        id: '2',
        name: 'second',
    },
    {
        id: '3',
        name: 'third'
    },
    {
        id: '4',
        name: 'fourth'
    },
    {
        id: '5',
        name: 'fifth'
    },
    {
        id: '6',
        name: 'sixth'
    },
    {
        id: '7',
        name: 'seventh'
    },
    {
        id: '8',
        name: 'eigth'
    },
    {
        id: '9',
        name: 'nineth'
    },
    {
        id: '10',
        name: 'ten'
    }
];

const lobbySlice = createSlice({
    name: 'lobbies',
    initialState,
    reducers: {}
});


export const {} = lobbySlice.actions;

export default lobbySlice.reducer;