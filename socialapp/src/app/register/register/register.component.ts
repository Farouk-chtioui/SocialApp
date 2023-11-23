import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  constructor(private router: Router) {}

  submitForm(event: Event) {
    event.preventDefault();
    // Implement your form submission logic here
    console.log('Form submitted!');
  }
  isRegisterRoute(): boolean {
    return this.router.url === '/register';
  }
}
