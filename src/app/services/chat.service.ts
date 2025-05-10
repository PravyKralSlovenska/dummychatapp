import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserTrackingService } from './user-tracking.service';
import { ChatMessage } from '../models/message.interface';


@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private readonly POST_URL = 'https://httpbin.org/post';

    private currentChatUserSubject = new BehaviorSubject<User | null>(null);
    public currentChatUser$ = this.currentChatUserSubject.asObservable();

    private chatMessagesSubject = new BehaviorSubject<ChatMessage[]>([]);
    public chatMessages$ = this.chatMessagesSubject.asObservable();

    private currentChatMessagesSubject = new BehaviorSubject<ChatMessage[]>([]);
    public currentChatMessages$ = this.currentChatMessagesSubject.asObservable();

    private loggedInUser: User | null = null;

    constructor(
        private http: HttpClient,
        private userTracking: UserTrackingService
    ) { }

    setLoggedInUser(user: User): void {
        this.loggedInUser = user;
    }

    startChat(user: User): void {
        // End previous chat if exists
        if (this.currentChatUserSubject.value) {
            this.endChat();
        }

        this.currentChatUserSubject.next(user);
        this.currentChatMessagesSubject.next([]);
        this.userTracking.incrementChatCount();
    }

    endChat(): void {
        this.currentChatUserSubject.next(null);
        this.currentChatMessagesSubject.next([]);
    }

    sendMessage(messageText: string): Observable<any> {
        if (!this.loggedInUser || !this.currentChatUserSubject.value) {
            throw new Error('Cannot send message without logged in user or chat recipient');
        }

        // Add user's message to chat history
        const userMessage: ChatMessage = {
            text: messageText,
            sender: this.loggedInUser,
            recipient: this.currentChatUserSubject.value,
            timestamp: new Date()
        };

        this.addMessageToChat(userMessage);
        this.userTracking.addChars(messageText.length);

        // Send message to API
        return this.http.post(this.POST_URL, { text: messageText });
    }

    processResponse(response: any): void {
        if (!this.loggedInUser || !this.currentChatUserSubject.value) {
            return;
        }

        const responseText = response.json?.text || '';
        const originIp = response.origin || '';

        // Get last digit from IP
        const lastDigit = parseInt(originIp.split('.').pop() || '0', 10);

        // Create response with 'A's (length = text length + last digit of IP)
        const responseMessage = 'A'.repeat(responseText.length + lastDigit);

        const chatResponse: ChatMessage = {
            text: responseMessage,
            sender: this.currentChatUserSubject.value,
            recipient: this.loggedInUser,
            timestamp: new Date(),
            isResponse: true
        };

        this.addMessageToChat(chatResponse);
        this.userTracking.addResponseChars(responseMessage.length);
    }

    private addMessageToChat(message: ChatMessage): void {
        // Add to all messages history
        const allMessages = [...this.chatMessagesSubject.value, message];
        this.chatMessagesSubject.next(allMessages);

        // Add to current chat
        if (this.currentChatUserSubject.value) {
            const currentMessages = [...this.currentChatMessagesSubject.value, message];
            this.currentChatMessagesSubject.next(currentMessages);
        }
    }

    getAllMessages(): ChatMessage[] {
        return this.chatMessagesSubject.value;
    }

    getCurrentChatMessages(): ChatMessage[] {
        return this.currentChatMessagesSubject.value;
    }
}
