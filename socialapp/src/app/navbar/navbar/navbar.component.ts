import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { FeedModule } from 'src/app/feed/feed.module';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SideenavModule } from 'src/app/sideenav/sideenav.module';
import { SharedService } from 'src/app/shared.service';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SideenavModule,FeedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTextControl = new FormControl();
  searchResults: any[] = [];
  

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any, private sharedService: SharedService, private http: HttpClient,
   private route: ActivatedRoute) {
    this.searchTextControl.valueChanges.subscribe(searchTerm => {
      if (searchTerm.trim() !== '') {
        this.searchUsers(searchTerm);
      } else {
        this.searchResults = [];
      }
    });
  }

  navigateToFeed() {
    this.router.navigate(['/feed']);
  }
  
  navigateToChatwindow() {
    this.router.navigate(['/chatwindow']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const animatedIcon = document.getElementById('myAnimatedIcon');
      if (animatedIcon) {
        animatedIcon.addEventListener('click', this.toggleIcon.bind(this));
      }
    }
  }

  toggleIcon(): void {
    const animatedIcon = document.getElementById('myAnimatedIcon');
    if (animatedIcon) {
      animatedIcon.classList.toggle('open');
      animatedIcon.classList.toggle('half-opacity');
    }
  }
  
  searchUsers(searchTerm: string): void {
    const apiUrl = `http://localhost/freshstart/socialapp/src/app/navbar/navbar/navbar.php?searchTerm=${searchTerm}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      console.log('Received data:', data);
      this.searchResults = data;
    });
  }

  navigateToUserProfile(useridd: string): void {
    // Check if the user is navigating to their own profile
    const currentUserId = this.route.snapshot.params['userIdd'];
    if (useridd === currentUserId) {
      // Redirect to the /profile route
      this.router.navigate(['/profile']);
    } else {
      // Redirect to the user's profile
      this.router.navigate(['/profile', useridd]);
    }
  }
}