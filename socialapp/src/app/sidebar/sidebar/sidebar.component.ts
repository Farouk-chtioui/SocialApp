import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxModule } from 'src/app/chatbox/chatbox.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ChatboxModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  friends=[
    {name:'John'}  //sample data
  ]

}


