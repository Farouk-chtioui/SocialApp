import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { FeedModule } from 'src/app/feed/feed.module';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SideenavModule } from 'src/app/sideenav/sideenav.module';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SideenavModule,FeedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  navigateToFeed() {
    this.router.navigate(['/feed']);
  }
  
  navigateToChatwindow() {
    this.router.navigate(['/chatwindow']);
  }

  ngOnInit(): void {
    // Check if the application is running in a browser environment
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
}