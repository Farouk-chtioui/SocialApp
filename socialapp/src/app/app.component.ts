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

// AppComponent

// AppComponent

constructor(private router: Router, private authService: AuthService) {
  this.isLoggedIn = this.authService.getLoginStatus();
  if (this.isLoggedIn) {
    this.router.navigate(['/feed']);
  } else {
    this.router.navigate(['/login']);
  }
}

login(isLoggedIn: boolean) {
  this.isLoggedIn = isLoggedIn;
  this.authService.setLoginStatus(isLoggedIn);
  if (isLoggedIn) {
    this.router.navigate(['/feed']);
  }
}

logout() {
  this.isLoggedIn = false;
  this.authService.setLoginStatus(false);
  this.router.navigate(['/login']);
}
  isRegisterRoute3() {
    return this.router.url === '/feed';
  }
// app.component.ts

isLoginRoute() {
  // Return true if the current route is the login route
  return this.router.url === '/login';
}
  isRegisterRoute() {
    return this.router.url === '/register';
  }
}