import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  authService: any;
  private refreshFeed = new Subject<void>();
  profilePicture?: string;

  constructor(private http: HttpClient,private sharedService: SharedService) { }
ngOnInit() {
  this.refreshFeed.pipe(
    startWith(null), 
    switchMap(() => this.getPosts()) 
  ).subscribe(posts => {
    console.log(posts); 
    this.posts = posts.reverse();
  });
  this.sharedService.currentProfilePicture.subscribe(profilePicture => this.profilePicture = profilePicture);

}
  refreshPosts() {
    this.refreshFeed.next();

  }
  getPosts(): Observable<any> {
    return this.http.get('http://localhost/freshstart/socialapp/src/app/feed/feed/feed.php');
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
}