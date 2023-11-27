import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string = '';
  email: string = '';

  constructor(private sharedService: SharedService) { }
  ngOnInit() {
    // Use the service to get the shared variable
    this.username = this.sharedService.getSharedVariable();
    this.email=this.sharedService.getSecondSharedVariable();
    console.log(this.username);
  }
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
