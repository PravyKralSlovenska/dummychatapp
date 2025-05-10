export interface ChatMessage {
    senderId: number;
    receiverId: number;
    text: string;
    timestamp: string;
}

export interface ListMessages {
    texts: ChatMessage[];
    total: number;
}