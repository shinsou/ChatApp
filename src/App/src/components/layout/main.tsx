import { LobbyList } from "../lobbyList";
import { MessageList } from "../messageList";
import { MemberList } from "../memberList";

export function Main() {
    return (
        <>
            <MemberList anchor="right" />
            <MessageList />
            <LobbyList anchor="left" />
        </>
    );
}