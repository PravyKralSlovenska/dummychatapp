import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.interface';
import { UserTrackingService } from '../../services/user-tracking.service';
import { ChatMessage } from '../../models/message.interface';

@Component({
  selector: 'app-pravy-panel',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './pravy-panel.component.html',
  styleUrl: './pravy-panel.component.css'
})
export class PravyPanelComponent implements OnInit {
  currentChatUser: User | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(
    private chatService: ChatService,
    private userTracking: UserTrackingService
  ) { }

  ngOnInit() {
    this.chatService.currentChatUser$.subscribe(user => {
      this.currentChatUser = user;
    });

    this.chatService.currentChatMessages$.subscribe(messages => {
      this.messages = messages;
      // Scroll to bottom when new messages arrive
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.currentChatUser) {
      return;
    }

    this.userTracking.incrementClicks();

    this.chatService.sendMessage(this.newMessage).subscribe(
      response => {
        // Process response from API
        this.chatService.processResponse(response);

        // Clear message input
        this.newMessage = '';
      },
      error => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    );
  }

  endChat() {
    this.userTracking.incrementClicks();
    this.chatService.endChat();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom() {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
