import { useSelector } from "react-redux";
import { Avatar, Box, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Member } from "../models/Member";
import { RootState } from "../store/configureStore";

export interface MemberListProps {
    anchor?: 'left' | 'top' | 'right' | 'bottom';
    drawerWidth?: number;
}

const init: MemberListProps = {
    drawerWidth: 240
}

export function MemberList(props: MemberListProps) {
    const options = { ...init, ...props };

    const memberGroups = useSelector((state: RootState) => state.memberGroups);
    const members: Array<Member> = useSelector((state: RootState) => state.members);

    return (
        <Drawer
            anchor={ options.anchor }
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
                    {memberGroups.map((group, index) => (
                        <div key={`group-${group.id}`}>
                            <ListSubheader>
                                {group.groupName}
                            </ListSubheader>
                            {members.filter(member => member.groupMember === group.id || (group.groupName === 'Members' && !member.groupMember)).map((member) => (
                                <ListItemButton key={`member-${group.id}-${member.id}`}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircle />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={member.name} />
                                </ListItemButton>
                            ))}
                        </div>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}