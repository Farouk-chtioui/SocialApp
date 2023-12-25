import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PostComponent } from '../feed/feed/post/post.component';



@NgModule({
  declarations: [
    UserprofileComponent
  ],
  imports: [
    CommonModule, PostComponent
  ],
  exports: [
    UserprofileComponent,
    PostComponent
  ]
})
export class UserprofileModule { }
