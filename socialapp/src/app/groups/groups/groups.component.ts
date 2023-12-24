import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupComponent {
  title: string = '';
  topic: string = '';
  maximum_number: number = 0;
  level: string = '';
  password: string = '';
  constructor(private http: HttpClient) { }
  submitForm(event: Event) {
    event.preventDefault();
  
    let data = {
      'title': this.title,
      'topic': this.topic,
      'maximum_number': this.maximum_number,
      'level': this.level,
      'password': this.password
    };
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    this.http.post('http://localhost/freshstart/socialapp/src/app/groups/groups/groups.php', data, { headers }).subscribe({
      next: response => {
        console.log('Server response: ', response);
        window.alert('Group creation was Successful');
      },
      error: error => {
        console.log('Server error: ', error);
        window.alert('Group creation Failed');
      }
    });
  
  }

  showCreateForm = false; // Add this line to declare the showCreateForm property

  // Add this method to toggle the showCreateForm property
  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }


}
