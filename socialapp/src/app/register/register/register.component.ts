import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  router: any;

  constructor(private http: HttpClient) { }

submitForm(event: Event) {
  event.preventDefault();

  let params = new HttpParams()
    .set('username', this.username)
    .set('email', this.email)
    .set('password', this.password);

  const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  this.http.post('http://localhost/freshstart/SocialApp/socialapp/src/app/register/register/register.php', params.toString(), { headers }).subscribe({
    next: response => console.log('Server response: ', response),
    error: error => console.log('Server error: ', error)
  });
}
}