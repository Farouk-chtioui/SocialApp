import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;


// Define the StudyRoom type
interface StudyRoom {
  title: string;
  topic: string;
  maxNumber: number;
  level: string;
  password: string;
  usePassword: boolean;
  creationTime: Date;
}

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupComponent {
  showCreateForm: boolean = false;
  newStudyRoom: StudyRoom = {
    title: '',
    topic: '',
    maxNumber: 0,
    level: '',
    password: '',
    usePassword: false,
    creationTime: new Date()
  };
  studyGroups: StudyRoom[] = [];

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  createStudyRoom() {
    console.log('Creating study room:', this.newStudyRoom);
    this.studyGroups.push({ ...this.newStudyRoom, creationTime: new Date() });
  
    // Reset the form after submission
    this.newStudyRoom = {
      title: '',
      topic: '',
      maxNumber: 0,
      level: '',
      password: '',
      usePassword: false,
      creationTime: new Date()
    };
    this.showCreateForm = false;
    console.log('Study groups:', this.studyGroups);
  }
  
  // Additional function to show or hide the form based on a condition
  // You can customize the condition based on your requirements
  shouldShowForm(): boolean {
    // Example: Only show the form if there are no study groups
    return this.studyGroups.length === 0;
  }
}