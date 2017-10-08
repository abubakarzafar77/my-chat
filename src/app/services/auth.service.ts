import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model'

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authState: any;


  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
  }
  authUser() {
    return this.user;
  }
  get currentUserId() {
    return this.authState !== null ? this.authState.uid : '';
  }

  signUp(email, password, displayName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      })
      .catch(error => console.log(error))

  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      })
      .catch(error => console.log(error))
  }
  setUserStatus(status): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    }
    this.db.object(path).update(data)
      .catch(error => console.log(error))
  }
  setUserData(email, displayName, status) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    }
    this.db.object(path).update(data)
      .catch(error => console.log(error))
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

}
