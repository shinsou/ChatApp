import { Box, CssBaseline } from "@mui/material";
import React from "react";

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
            {props.children}
        </Box>
    </React.Fragment>
);