import React from "react";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export function Header() {
    const [ anchorElement, setAnchorElement ] = React.useState<null | HTMLElement>(null);
    const menuId = 'account-menu';
    const isOpen = Boolean(anchorElement);

    const handleMenuClose = () => {
        setAnchorElement(null);
    }

    const renderMenu = () => (
        <Menu
            anchorEl={anchorElement}
            anchorOrigin={{
                vertical: 'top',
                horizontal : 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    )

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                     zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box >
                        
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu()}
        </>
    );
}