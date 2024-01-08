import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';


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
  useridd:number=0;
  profilePicture = 'assets/images/profilepic.png'; 

  constructor(private sharedService: SharedService,private http: HttpClient) { }
  ngOnInit() {
    // Use the service to get the shared variable
    this.username = this.sharedService.getSharedVariable();
    this.email=this.sharedService.getSecondSharedVariable();
    this.useridd=this.sharedService.getThirdSharedVariable();
    console.log(this.username);
    this.http.get(`http://localhost/freshstart/socialapp/src/app/profile/profile/getprofile.php?UserID=${this.useridd}`)
    .subscribe((response: any) => {
      if (response && response.path) {
        this.profilePicture = response.path;
        this.sharedService.changeProfilePicture(this.profilePicture);
      }
    }, error => {
      console.error(error);
    });
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


  uploadImage(event?: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('UserID', this.useridd.toString()); // Convert the useridd to a string before appending
  
    this.http.post('http://localhost/freshstart/socialapp/src/app/profile/profile/profile.php', formData).subscribe((response: any) => {
      if (response && response.path) {
        this.profilePicture = response.path;
        location.reload();
      }
      console.log(response);
    }, error => {
      console.error(error);
    });
  }


}
