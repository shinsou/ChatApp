import { Route, Routes } from "react-router-dom";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import darkScrollbar from '@mui/material/darkScrollbar';
import Layout from "./components/layout";
import { Main } from "./components/layout/main";
import { Header } from "./components/layout/header";


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
            <Layout>
                <Header />
                <Routes>
                    <Route path="/*" element={<Main />} />
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}