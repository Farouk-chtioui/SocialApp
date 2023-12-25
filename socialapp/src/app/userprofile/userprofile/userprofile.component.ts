import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  posts: any[] = [];
  authService: any;
  private refreshFeed = new Subject<void>();

  constructor(private http: HttpClient,private sharedService: SharedService) { }
  ngOnInit() {
    const userId = this.sharedService.getThirdSharedVariable();
    this.refreshFeed.pipe(
      startWith(null), // Trigger the initial fetch
      switchMap(() => this.getPosts(userId)) // Switch to new getPosts observable on each refresh
    ).subscribe(posts => {
      console.log(posts);  // Log the posts to the console
      this.posts = posts;
    });
  }
  
  refreshPosts() {
    const userId = this.sharedService.getThirdSharedVariable();
    this.getPosts(userId).subscribe(posts => {
      this.posts = posts;
    });
  }
  getPosts(userId?: number): Observable<any> {
    let url = 'http://localhost/freshstart/socialapp/src/app/userprofile/userprofile/userprofile.php';
    if (userId) {
      url += `?userId=${userId}`;
    }
    return this.http.get(url);
  }

  deletePost(postId: number) {
    const userId = this.sharedService.getThirdSharedVariable();
    this.http.delete(`http://localhost/freshstart/socialapp/src/app/feed/feed/delete.php?id=${postId}&userId=${userId}`)
      .subscribe(() => {
        // Remove the post from the posts array
        this.posts = this.posts.filter(post => post.PostID !== postId);

        // Trigger a refresh of the feed
        this.refreshFeed.next();
      });
  }
  selectReaction(event: any) {
    // Get all reaction buttons
    const buttons = document.querySelectorAll('.reaction-btn');
  
    // Remove the 'selected' class from all buttons
    buttons.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        btn.classList.remove('selected');
      }
    });
  
    // Add the 'selected' class to the clicked button
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('selected');
    }
  }
}

