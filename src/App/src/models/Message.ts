export interface Message {
    id: string;
    lobbyId: string;
    senderId: string;
    content: string;
    date: Date;
    resolvedSenderName?: string;
}