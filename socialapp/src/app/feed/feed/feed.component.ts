import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { ViewChild, ElementRef } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @ViewChild('commentInput') commentInput: ElementRef | undefined;
  posts: any[] = [];
  authService: any;
  private refreshFeed = new Subject<void>();
  profilePicture = 'assets/images/profilepic.png'; 
  comments: any[] = [];
  useridd=this.sharedService.getThirdSharedVariable();


  constructor(private http: HttpClient,private sharedService: SharedService) { }
  ngOnInit() {
    this.refreshFeed.pipe(
      startWith(null), 
      switchMap(() => this.getPosts()) 
    ).subscribe(posts => {
      console.log(posts); 
      this.posts = posts.reverse();
    
      // Fetch the profile picture and comments for each post's user
      this.posts.forEach(post => {
        this.http.get(`http://localhost/freshstart/socialapp/src/app/profile/profile/getprofile.php?UserID=${post.UserID}`)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.path) {
            post.profilePicture = response.path;
          }
        });
    
        // Fetch comments for the post
        this.getComments(post.PostID).subscribe(comments => {
          console.log('Comments:', comments);
          post.comments = comments;
        });
      });
    });
  
  }
  refreshPosts() {
    this.refreshFeed.next();

  }
  getPosts(): Observable<any> {
    return this.http.get('http://localhost/freshstart/socialapp/src/app/feed/feed/feed.php');
  }
  getComments(postId: number) {
    return this.http.get<any[]>(`http://localhost/freshstart/socialapp/src/app/feed/feed/getComments.php?postID=${postId}`);
  }
  deletePost(postId: number) {
    // Remove the post from the local array first
    this.posts = this.posts.filter(post => post.PostID !== postId);
  
    const userId = this.sharedService.getThirdSharedVariable();
    this.http.delete(`http://localhost/freshstart/socialapp/src/app/feed/feed/delete.php?id=${postId}&userId=${userId}`)
      .subscribe(() => {
      }, error => {
        this.refreshPosts();
      });
  }
  postComment(userId: number, postId: number, event: Event) {
    event.preventDefault();
  
    const url = 'http://localhost/freshstart/socialapp/src/app/feed/feed/comments.php';
    const commentText = this.commentInput?.nativeElement.value;
    const body = { userID: userId, postID: postId, commentText: commentText };
    const headers = { 'Content-Type': 'application/json' };
  
    console.log('Posting comment:', body);
  
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(
      response => {
        console.log('Response from server:', response);
        
      },
      error => {
        console.error('Error:', error);
        alert('Could not post comment. Please try again later.');
      }
    );
  

    if (this.commentInput) {
      this.commentInput.nativeElement.value = '';
    }
  }
}
