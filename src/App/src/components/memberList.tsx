import { useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    SxProps,
    Toolbar
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Member } from "../models/Member";
import { RootState } from "../store/configureStore";
import { MemberGroupType } from "../store/memberGroupsReducer";

export interface MemberListProps {
    anchor?: 'left' | 'top' | 'right' | 'bottom';
    drawerWidth?: number;
    styles: SxProps;
}

const init: MemberListProps = {
    drawerWidth: 240,
    styles: {
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box'
        }
    }
}

const Members = ({id, groupName}) => {
    const members: Array<Member> = useSelector((state: RootState) => state.members);
    console.log(`${id} | ${groupName}`);
    return (
        <List dense={true}>
            {members.filter(member => member.groupMember === id || (groupName === 'Members' && !member.groupMember)).map((member) => (
                <ListItem key={`member-${id}-${member.id}`}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountCircle />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={member.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

const MemberGroups = () => {
    const memberGroups: Array<MemberGroupType> = useSelector((state: RootState) => state.memberGroups);

    return (
        <List dense={true}>
            {memberGroups.map((group) => (
                <li key={`group-${group.id}`}>
                    <ListSubheader component="div">
                        {group.groupName}
                    </ListSubheader>
                    <ListItem key={`group-${group.id}-members`}>
                        <Members {...group} />
                    </ListItem>
                </li>
            ))}
        </List>
    );
}

export function MemberList(props: MemberListProps) {
    const options = { ...init, ...props };

    return (
        <Drawer
            anchor={ options.anchor }
            variant="permanent"
            sx={options.styles}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <MemberGroups />
            </Box>
        </Drawer>
    );
}