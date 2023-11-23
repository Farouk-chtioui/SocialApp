import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,ChatwindowComponent
  ],
  exports: [ChatwindowComponent]
})
export class ChatwindowModule { }
