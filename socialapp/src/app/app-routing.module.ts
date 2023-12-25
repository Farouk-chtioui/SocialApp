import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component'
import { GroupComponent } from './groups/groups/groups.component';
import { FriendsComponent } from './friends/friends/friends.component';
import { FeedComponent } from './feed/feed/feed.component';
import { ChatboxComponent } from './chatbox/chatbox/chatbox.component';
import { ChatwindowComponent } from './chatwindow/chatwindow/chatwindow.component';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';

 const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  
  { path: 'groups', component: GroupComponent },
  { path: 'friends', component: FriendsComponent},
  { path: 'chatbox', component: ChatboxComponent},
  { path: 'chatwindow', component: ChatwindowComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:useridd', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }