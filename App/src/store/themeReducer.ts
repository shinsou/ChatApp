import { createTheme, PaletteMode, Theme } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

export const themeReducer = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<PaletteMode>) => {
            state.palette.mode = action.payload;
        }
    }
})

export const { setMode } = themeReducer.actions;

export default themeReducer.reducer;