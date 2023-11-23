import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialApp';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // Perform your login logic here (authentication, etc.)
    // For now, we'll set isLoggedIn to true as a placeholder
    this.isLoggedIn = true;

    // Navigate to the main page after login
    this.router.navigate(['/feed']); // Replace with your actual route path
  }

  logout() {
    // Perform your logout logic here
    this.isLoggedIn = false;
     // Navigate to the login page after logout
     this.router.navigate(['/login']); // Replace with your actual route path
  }}
