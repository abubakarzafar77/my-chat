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
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                console.log(user.uid);

                this.setUserStatus('online', user.uid);
                this.router.navigate(['chat']);
            })
            .catch(error => console.log(error))
    }
    //set user status 
    setUserStatus(userStatus, userId): void {

        const path = `users/${userId}`;
        const data = {
            status: userStatus
        }

        this.db.object(path).update(data)
            .catch(error => console.log(error))

        //set local variable 
        this.db.object(path)
            .subscribe(user => {
                const currentUser = {
                    displayName: user.displayName,
                    email: user.email,
                    status: user.status
                }
                console.log(currentUser);
                if (currentUser) {
                    localStorage.setItem(currentUser.displayName, JSON.stringify(currentUser));
                }
            });
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
