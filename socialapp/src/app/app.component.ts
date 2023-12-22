// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SharedService } from './shared.service';

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

constructor(private router: Router, private authService: AuthService,private sharedService: SharedService) {
  this.isLoggedIn = this.authService.getLoginStatus();
  if (this.isLoggedIn) {
    this.router.navigate(['/feed']);
  } else {
    this.router.navigate(['/login']);
  }
}
ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user) {
    this.sharedService.setSharedVariable(user.Username);
    this.sharedService.setSecondSharedVariable(user.Email);
    this.sharedService.setThirdSharedVariable(user.UserID);
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