import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessagesService } from '../../services/chat-messages.service';
import { ChatMessage } from '../../models/chatMessage.interface';

@Component({
  selector: 'app-messages-list',
  imports: [CommonModule],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css'
})
export class MessagesListComponent {
  chatMessages: ChatMessage[] = [];
  total = 0;

  constructor(private ChatMessagesService: ChatMessagesService) {
    // this.ChatMessagesService.Message.subscribe((sprava: ChatMessage | null) => {
    //   if (sprava) {
    //     this.chatMessages.push(sprava);
    //     this.total++;
    //   }
    // });

    this.ChatMessagesService.ListMessage.subscribe((spravy: ChatMessage[]) => {
      this.chatMessages = spravy;
      this.total = spravy.length;
    });
  }
}
