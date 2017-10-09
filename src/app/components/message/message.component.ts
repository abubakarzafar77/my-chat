import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    @Input() chatMessage: ChatMessage;
    timeStamp: Date = new Date();
    messageContent: string;
    userName: string;
    userEmail: string;
    isOwnMessage: boolean;
    ownEmail: string;

    constructor(private authService: AuthService) {
        authService.authUser()
            .subscribe(user => {
                this.ownEmail = user.email;
                this.isOwnMessage = this.ownEmail === this.userEmail;
                // console.log(this.isOwnMessage);
            });
    }

    ngOnInit(chatMessage = this.chatMessage) {
        this.userName = chatMessage.userName;
        this.userEmail = chatMessage.email;
        this.messageContent = chatMessage.message;
        this.timeStamp = chatMessage.timeStamp;
    }

}
