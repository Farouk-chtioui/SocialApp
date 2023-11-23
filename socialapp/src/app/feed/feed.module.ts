import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './feed/post/post.component';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule
    ,FeedComponent,
    PostComponent
    
  ],
  exports: [
    FeedComponent,
    PostComponent
  ]
})
export class FeedModule { }