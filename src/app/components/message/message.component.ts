import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  timeStamp: Date = new Date();
  messageContent:string;
  userName: string;
  userEmail: string;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.userName = chatMessage.userName;
    this.userEmail = chatMessage.email;
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
  }

}
