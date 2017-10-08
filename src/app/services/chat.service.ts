import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';


import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/user.model';


@Injectable()
export class ChatService {

  public user: any;
  public chatMessages: FirebaseListObservable<ChatMessage[]>;
  public ChatMessage: ChatMessage;
  public userName: Observable<string>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    // this.afAuth.authState.subscribe(auth => {
    //   if(auth !== undefined && auth !== null){
    //     this.user = auth;
    //   }
    // })
  }

  public sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = "test@gmail.com";
    // const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timestamp: timestamp,
      userName: "Abubakar",
      // userName: this.userName,
      email: email
    });
  }

  public getMessages(): FirebaseListObservable<ChatMessage[]> {
    //query to create out message feed binding 
    console.log("getMessage");
    return this.db.list('messages', {
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });
  }


  public getTimeStamp(): any {
    const pakistan = new Date();
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDay();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return (date + ' ' + time);
  }

}
