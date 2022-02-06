import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'
import lobbyReducer from './lobbyReducer';
import memberReducer from './memberReducer';
import messageReducer from './messageReducer';
import memberGroupsReducer from './memberGroupsReducer'

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    lobbies: lobbyReducer,
    members: memberReducer,
    memberGroups: memberGroupsReducer
  },
    // serializableCheck: false -> will hide DateTime serialization validation check; most likely due to mockup data initialization
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)