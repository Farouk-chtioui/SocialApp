// app.component.ts
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
  isLoggedIn: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  login(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
    if (isLoggedIn) {
      this.router.navigate(['/feed']);
    }
  }
  
  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  isRegisterRoute3() {
    return this.router.url === '/feed';
  }
  isRegisterRoute2() {
    return this.router.url === '/login';
  }
  isRegisterRoute() {
    return this.router.url === '/register';
  }
}