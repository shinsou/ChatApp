import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const apiServiceUrl = 'https://localhost:5001/api/v1';

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${apiServiceUrl}/message` }),
    endpoints: (builder) => ({
        getMessagesByLobbyId: builder.query<any, any>({
            query: (lobbyId) => `/${lobbyId}`
        })
    })
});