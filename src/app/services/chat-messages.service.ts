import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../models/chatMessage.interface';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { PostBody } from '../models/postBody.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  private readonly postURL = "https://httpbin.org/post";

  private MessageSubject = new BehaviorSubject<ChatMessage | null>(null);
  public Message = this.MessageSubject.asObservable();

  private ListMessageSubject = new BehaviorSubject<ChatMessage[]>([]);
  public ListMessage = this.ListMessageSubject.asObservable();

  private ChatUserSubject = new BehaviorSubject<User | null>(null);
  public ChatUser = this.ChatUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  addMessage(message: ChatMessage): void {
    // Update the list of messages
    const currentMessages = this.ListMessageSubject.getValue();
    currentMessages.push(message);
    this.ListMessageSubject.next(currentMessages);

    this.MessageSubject.next(message);
  }

  setUser(user: User): void {
    this.ChatUserSubject.next(user);
  }

  postPost(text: string): void {
    this.http.post<PostBody>(this.postURL, { text: text }).subscribe((response: PostBody) => {
      if (!response) {
        console.error("nieco sa dojebalo");
        return;
      }
      this.addResponse(response);
    });
  }

  addResponse(response: PostBody): void {
    const responseText = response.json?.text || '';
    const originIp = response.origin || '';

    const lastDigit = parseInt(originIp.split('.').pop() || '0', 10);

    // Create response with 'A's (length = text length + last digit of IP)
    // const responseMessage = 'A'.repeat(responseText.length + lastDigit)
    const responseMessage = 'A'.repeat(3)

    let prihlasenyUser = JSON.parse(localStorage.getItem("prihlasenyUser") || "{}");
    var responseMessageObj: ChatMessage = {
      senderId: 0,
      receiverId: prihlasenyUser.id,
      text: responseMessage,
      timestamp: new Date().toLocaleString('en-GB')
    }
    this.addMessage(responseMessageObj);
  }
}
