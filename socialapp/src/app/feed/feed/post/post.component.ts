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

  username: string = '';
  useridd:number=0;
  constructor(private http: HttpClient,private sharedService: SharedService) { }
  ngOnInit() {
    this.username = this.sharedService.getSharedVariable();
    this.useridd=this.sharedService.getThirdSharedVariable();
    console.log(this.username);
  }
  selectedFile: File | null = null;

  onFileSelected(event?: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.postToServer(form.value);
      form.reset();
    }

  }
  postToServer(postData: any) {
    const formData = new FormData();
    formData.append('userID', postData.userID);
    formData.append('caption', postData.caption);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.http.post('http://localhost/freshstart/socialapp/src/app/feed/feed/post/post.php', formData)
      .subscribe(() => {
        this.postSubmitted.emit(); // Emit the event after the post request has completed
      });
  }

}