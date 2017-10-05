import { Component, OnInit, OnChanges } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import {ChatService} from '../../services/chat.service';
import { Observable } from 'rxjs/Observable';
import {ChatMessage} from '../../models/chat-message.model';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: FirebaseListObservable<ChatMessage[]>;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    console.log("OnInit");
    this.feed = this.chatService.getMessages();
    console.log(this.feed);
  }
  ngOnChanges() {
    this.feed = this.chatService.getMessages();
  }

}
