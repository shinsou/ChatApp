import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar
} from "@mui/material";
import { useSelector } from "react-redux";
import { Lobby } from "../models/Lobby";
import { RootState } from "../store/configureStore"

export interface LobbyListProps {
    anchor?: 'left' | 'top' | 'right' | 'bottom';
    drawerWidth?: number;
}

const init: LobbyListProps = {
    drawerWidth: 240
}

export function LobbyList(props: LobbyListProps) {
    const options = { ...init, ...props };

    const lobbies = useSelector((state: RootState) => state.lobbies);

    return (
        <Drawer
            anchor={props.anchor}
            variant="permanent"
            sx={{
                width: options.drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: options.drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List dense={true}>
                    {lobbies.map((lobby) => (
                        <ListItem key={`lobby-${lobby.id}`} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                            <ListItemButton>
                                <ListItemText primary={lobby.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}