import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Injectable()
export class AuthGuard implements CanActivate {
    currentUserName: string;

    constructor(
        private router: Router,
        private chatService: ChatService
    ) {
        this.chatService.getUser()
            .subscribe(user => {
                this.currentUserName = user.displayName;
                console.log(this.currentUserName);
            })
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(this.currentUserName)) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}