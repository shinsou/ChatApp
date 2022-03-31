import { createSlice } from "@reduxjs/toolkit";

export type MemberGroupType = {
    id: string;
    groupName: string;
}

const initialState: Array<MemberGroupType> = [
    {
        id: '1',
        groupName: 'Admins'
    },
    {
        id: '2',
        groupName: 'Members'
    }
];

const memberGroupsSlice = createSlice({
    name: 'memberGroups',
    initialState,
    reducers: {}
});

export const {} = memberGroupsSlice.actions;

export default memberGroupsSlice.reducer;