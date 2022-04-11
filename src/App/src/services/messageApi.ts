import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message } from "../models/Message";

const apiServiceUrl = 'https://localhost:5001/api/v1';

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${apiServiceUrl}/message` }),
    endpoints: (builder) => ({
        getPagedMessagesByLobbyId: builder.query<Array<Message>, { lobbyId: number, pageIndex: number }>({
            query: (queryPayload) => `/${queryPayload.lobbyId}/${queryPayload.pageIndex ?? 0}`
        })
    })
});

export const { useGetPagedMessagesByLobbyIdQuery } = messageApi;