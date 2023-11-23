import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component'
import { GroupComponent } from './groups/groups/groups.component';
import { FriendsComponent } from './friends/friends/friends.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'friends', component: FriendsComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }