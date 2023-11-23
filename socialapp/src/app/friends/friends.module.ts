import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,FriendsComponent
  ],
  exports: [FriendsComponent]
})
export class FriendsModule { }
