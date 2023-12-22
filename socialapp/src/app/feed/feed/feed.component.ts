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

  constructor(private http: HttpClient,private sharedService: SharedService) { }
  ngOnInit() {
    this.refreshFeed.pipe(
      startWith(null), // Trigger the initial fetch
      switchMap(() => this.getPosts()) // Switch to new getPosts observable on each refresh
    ).subscribe(posts => {
      console.log(posts);  // Log the posts to the console
      this.posts = posts;
    });
  }
  refreshPosts() {
    this.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  getPosts(): Observable<any> {
    return this.http.get('http://localhost/freshstart/socialapp/src/app/feed/feed/feed.php');
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
}