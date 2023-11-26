import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router) { }

// register.component.ts
submitForm(event: Event) {
  event.preventDefault();

  // Check if username, email, or password are empty
  if (!this.username || !this.email || !this.password) {
    window.alert('Username, email, and password cannot be empty');
    return;
  }

  // Check if email is valid
  const emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  if (!emailPattern.test(this.email)) {
    window.alert('Email is not valid');
    return;
  }

  // Check if password meets the requirements
  const passwordPattern = new RegExp('(?=.*[a-z])(?=.*[A-Z]).{10,}');
  if (!passwordPattern.test(this.password)) {
    window.alert('Password must contain at least one uppercase letter, one lowercase letter, and be at least 10 characters long');
    return;
  }

  let params = new HttpParams()
    .set('username', this.username)
    .set('email', this.email)
    .set('password', this.password);

  const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  this.http.post('http://localhost/freshstart/socialapp/src/app/register/register/register.php', params.toString(), { headers }).subscribe({
    next: response => {
      console.log('Server response: ', response);
      window.alert('Registration Successful');
      this.router.navigate(['/login']);  // navigate to the login page
    },
    error: error => {
      console.log('Server error: ', error);
      window.alert('Registration Failed');
    }
  });

}
}