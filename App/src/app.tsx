import { createTheme, ThemeProvider } from "@mui/material";
import darkScrollbar from '@mui/material/darkScrollbar';
import React from "react";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: darkScrollbar(),
          },
        },
    },
    palette: {
        mode: 'dark'
    }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                {`Hello world!`}
            </React.Fragment>
        </ThemeProvider>
    );
}