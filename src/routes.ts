import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/components/signup-form/signup-form.component';
import { LoginFormComponent } from './app/components/login-form/login-form.component';
import { ChatroomComponent } from './app/components/chatroom/chatroom.component';

export const appRoutes: Routes = [
    { path: 'signup' , component: SignupFormComponent },
    { path: 'login' , component: LoginFormComponent },
    { path: 'chat' , component: ChatroomComponent },
    { path: '' ,redirectTo: '/login',  pathMatch: 'full' },
]