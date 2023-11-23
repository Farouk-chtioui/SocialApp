import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // Properties for storing course and interest data
  courses: string[] = [];
  interests: string[] = [];

  // Properties for storing the values of the new course and new interest input fields
  newCourse: string = '';
  newInterest: string = '';

  // Functions to add course and interest
  addCourse(): void {
    if (this.newCourse && !this.courses.includes(this.newCourse)) {
      this.courses.push(this.newCourse);
      this.newCourse = ''; // Reset the newCourse input field
    }
  }

  addInterest(): void {
    if (this.newInterest && !this.interests.includes(this.newInterest)) {
      this.interests.push(this.newInterest);
      this.newInterest = ''; // Reset the newInterest input field
    }
  }
}
