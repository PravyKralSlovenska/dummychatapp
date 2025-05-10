import { User } from './user.interface';

export interface ChatMessage {
    text: string;
    sender: User;
    recipient: User;
    timestamp: Date;
    isResponse?: boolean;
}