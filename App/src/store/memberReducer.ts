import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../models/Member";

const initialState: Array<Member> = [
    {
        id: '1',
        account: 'first',
        name: 'first',
        groupMember: '1'
    },
    {
        id: '2',
        account: 'second',
        name: 'second',
        groupMember: '2'
    },
    {
        id: '3',
        account: 'third',
        name: 'third'
    },
    {
        id: '4',
        account: 'fourth',
        name: 'fourth'
    },
    {
        id: '5',
        account: 'fifth',
        name: 'fifth'
    },
    {
        id: '6',
        account: 'sixth',
        name: 'sixth'
    },
    {
        id: '7',
        account: 'seventh',
        name: 'seventh'
    },
    {
        id: '8',
        account: 'eigth',
        name: 'eigth'
    },
    {
        id: '9',
        account: 'nineth',
        name: 'nineth'
    },
    {
        id: '10',
        account: 'ten',
        name: 'ten'
    }
];

export const getMemberById = createAsyncThunk(
    'members/getByIdStatus',
    async (id: string, { getState }) => {
        const { members } = getState() as any;
        return members.find(member => member.id == id)?.name;
    }
)

const memberSlice = createSlice({
    name: 'members',
    initialState,
    reducers: { }
});

export const {  } = memberSlice.actions;

export default memberSlice.reducer;