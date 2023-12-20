import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPosts().subscribe(posts => {
      console.log(posts);  // Log the posts to the console
      this.posts = posts;
    });
  }

  getPosts(): Observable<any> {
    return this.http.get('http://localhost/freshstart/socialapp/src/app/feed/feed/feed.php');
  }
}