import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
import { SharedService } from 'src/app/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {
  @Output() postSubmitted = new EventEmitter<void>();
  @Output() newPost = new EventEmitter<any>();

  username: string = '';
  useridd:number=0;
  constructor(private http: HttpClient,private sharedService: SharedService) { }
  ngOnInit() {
    this.username = this.sharedService.getSharedVariable();
    this.useridd=this.sharedService.getThirdSharedVariable();
    console.log(this.username);
  }
  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      // Update the element with the file name
      const selectedFileNameElement = document.getElementById('selectedFileName');
      if (selectedFileNameElement) {
        selectedFileNameElement.textContent = this.selectedFile.name;
      }
    }
  }
  onSubmit(postForm: NgForm) {
    const postData = {
      userID: this.useridd,
      caption: postForm.value.caption,
      image: this.selectedFile
    };
  
    // Emit the new post data
    this.newPost.emit({
      userID: this.useridd,
      Caption: postForm.value.caption,
      Image_URL: this.selectedFile ? URL.createObjectURL(this.selectedFile) : null
    });
  
    this.postToServer(postData);
  
    postForm.resetForm(); // Reset the form after submission
    this.selectedFile = null; // Clear the selected file
    const fileInputElement = document.getElementById('media') as HTMLInputElement;
    if (fileInputElement) {
      fileInputElement.value = '';
    }
  
    // Clear the file name display
    const selectedFileNameElement = document.getElementById('selectedFileName');
    if (selectedFileNameElement) {
      selectedFileNameElement.textContent = '';
    }
  }
  postToServer(postData: any) {
    const formData = new FormData();
    formData.append('userID', postData.userID);
    formData.append('caption', postData.caption);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.http.post('http://localhost/freshstart/socialapp/src/app/feed/feed/post/post.php', formData, {responseType: 'text'})
    .subscribe((response) => {
      // Manually parse the JSON part of the response
      const jsonStart = response.indexOf('{');
      const jsonEnd = response.lastIndexOf('}') + 1;
      const jsonResponse = JSON.parse(response.substring(jsonStart, jsonEnd));
  
      // Emit the event here, after the HTTP request has completed
      this.postSubmitted.emit(jsonResponse);
    });
  }

}