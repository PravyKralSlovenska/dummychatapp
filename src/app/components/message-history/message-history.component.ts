import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/message.interface';

@Component({
    selector: 'app-message-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-history.component.html',
    styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
    allMessages: ChatMessage[] = [];

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.chatMessages$.subscribe(messages => {
            this.allMessages = messages;
        });
    }

    formatTimestamp(date: Date): string {
        return date.toLocaleString();
    }
}
