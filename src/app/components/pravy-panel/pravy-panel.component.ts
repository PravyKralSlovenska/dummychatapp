import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.interface';
import { ChatMessagesService } from '../../services/chat-messages.service';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';
import { ApickaService } from '../../services/apicka.service';

@Component({
  selector: 'app-pravy-panel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pravy-panel.component.html',
  styleUrl: './pravy-panel.component.css'
})
export class PravyPanelComponent {
  receiverUser: User | null = null;
  prihlasenyUser: User = JSON.parse(localStorage.getItem("prihlasenyUser") || "{}");
  // chatMessages: ChatMessage[] = this.receiverUser?.chatHistory.texts || [];

  form = new FormGroup({
    text: new FormControl('')
  });

  constructor(private ChatMessagesService: ChatMessagesService, private route: Router, private api: ApickaService) {
    this.ChatMessagesService.Message.subscribe((sprava: ChatMessage | null) => {
      if (sprava && this.receiverUser) {
        this.receiverUser.chatHistory.push(sprava);
        console.log(this.receiverUser.chatHistory);
      }
    });

    this.ChatMessagesService.ChatUser.subscribe((user: User | null) => {
      if (user) {
        if (!user.chatHistory) {
          user.chatHistory = [];
        }
        this.receiverUser = user;
      }
      console.log(user);
    });
  }

  vlozSpravu(text: string): void {
    const sprava: ChatMessage = {
      senderId: this.prihlasenyUser.id,
      receiverId: this.receiverUser!.id,
      text: text,
      timestamp: new Date().toLocaleString('en-GB')
    };

    this.ChatMessagesService.addMessage(sprava);
  }

  onSubmit(): void {
    this.vlozSpravu(this.form.value.text!);
    this.ChatMessagesService.postPost(this.form.value.text!);
    this.form.reset();
  }

  endChat(): void {
    this.route.navigate(["/list-of-messages", this.receiverUser!.id, `${this.receiverUser!.firstName}-${this.receiverUser!.lastName}`]);
    this.receiverUser = null;
  }
}
